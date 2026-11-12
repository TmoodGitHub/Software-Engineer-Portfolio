import openai
import json
import os
import re
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

MAX_CHUNK_CHARS = 3000
SOURCE_MARKER = re.compile(r'^--- (\S+) ---$', re.M)
RESUME_HEADING = re.compile(r'^[A-Z][A-Z &/]+$')
DATE_RANGE = re.compile(r'^[A-Z][a-z]{2} \d{4} - (Present|[A-Z][a-z]{2} \d{4})$')

SOURCE_LABELS = {
    'tamer_resume.txt': 'Resume',
    'tamer_github.txt': 'GitHub profile README',
    'tamer_notes.txt': 'Notes',
}


def split_sources(text):
    parts = SOURCE_MARKER.split(text)
    return [(parts[i], parts[i + 1]) for i in range(1, len(parts), 2)]


LABELED_LINE = re.compile(r'^[A-Z][\w &/]+: ')


def join_wrapped_lines(lines):
    joined = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line.startswith('●'):
            joined.append('- ' + line[1:].strip())
        elif joined and not LABELED_LINE.match(line):
            joined[-1] += ' ' + line
        else:
            joined.append(line)
    return joined


def make_chunk(heading, lines):
    return heading + ':\n' + '\n'.join(lines)


def split_long(heading, lines):
    chunks, current = [], []
    for line in lines:
        if current and len(make_chunk(heading, current + [line])) > MAX_CHUNK_CHARS:
            chunks.append(make_chunk(heading, current))
            current = []
        current.append(line)
    if current:
        chunks.append(make_chunk(heading, current))
    return chunks


def split_entries(lines, starts_entry):
    entries, current = [], []
    for i in range(len(lines)):
        if current and starts_entry(lines, i):
            entries.append(current)
            current = []
        current.append(lines[i])
    if current:
        entries.append(current)
    return entries


def is_job_start(lines, i):
    return i + 1 < len(lines) and DATE_RANGE.match(lines[i + 1].strip()) is not None


def is_project_start(lines, i):
    line = lines[i].strip()
    next_line = lines[i + 1].strip() if i + 1 < len(lines) else ''
    return ' | ' in line and not line.startswith('●') and next_line and ' ' not in next_line


def chunk_resume(body, label):
    sections, title, current = [], 'Contact', []
    for line in body.split('\n'):
        if RESUME_HEADING.match(line.strip()):
            sections.append((title, current))
            title, current = line.strip().title(), []
        else:
            current.append(line)
    sections.append((title, current))

    chunks = []
    for title, lines in sections:
        lines = [l for l in lines if l.strip()]
        if not lines:
            continue
        if title == 'Professional Experience':
            for entry in split_entries(lines, is_job_start):
                role, dates = entry[0].strip(), entry[1].strip()
                heading = f'{label}, {title}: {role} ({dates})'
                chunks += split_long(heading, join_wrapped_lines(entry[2:]))
        elif title == 'Projects':
            for entry in split_entries(lines, is_project_start):
                heading = f'{label}, {title}: {entry[0].strip()} ({entry[1].strip()})'
                chunks += split_long(heading, join_wrapped_lines(entry[2:]))
        else:
            chunks += split_long(f'{label}, {title}', join_wrapped_lines(lines))
    return chunks


def clean_markdown(lines):
    cleaned = []
    for line in lines:
        line = re.sub(r'\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)', '', line)  # linked badges
        line = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', line)  # images
        line = re.sub(r'<h4>(.*?)</h4>', r'\1:', line)
        line = re.sub(r'<[^>]+>', '', line).strip()
        if line and not re.fullmatch(r'[-|: ]+', line):
            cleaned.append(line)
    return cleaned


def chunk_markdown(body, label):
    chunks, path, current = [], ['Intro'], []

    def flush():
        lines = clean_markdown(current)
        if lines:
            chunks.extend(split_long(f'{label}, ' + ' > '.join(path), lines))

    for line in body.split('\n'):
        match = re.match(r'^(#{1,3}) (.+)$', line)
        if match:
            flush()
            level = len(match.group(1))
            title = match.group(2).strip()
            path = ['Intro'] if level == 1 else path[:level - 2] + [title]
            current = []
        else:
            current.append(line)
    flush()
    return chunks


def chunk_paragraphs(body, label):
    chunks = []
    for p in body.split('\n\n'):
        p = p.strip()
        if not p:
            continue
        lead, sep, rest = p.partition(': ')
        if sep and len(lead) <= 40 and '\n' not in lead:
            chunks.append(f'{label}, {lead}:\n{rest.strip()}')
        else:
            chunks.append(f'{label}:\n{p}')
    return chunks


def chunk_text(text):
    chunks = []
    for name, body in split_sources(text):
        label = SOURCE_LABELS.get(name, name)
        if name == 'tamer_resume.txt':
            chunks += chunk_resume(body, label)
        elif name.endswith('_github.txt'):
            chunks += chunk_markdown(body, label)
        else:
            chunks += chunk_paragraphs(body, label)
    return chunks


def embed_chunk(chunks):
    embeded = []
    for chunk in chunks:
        response = openai.embeddings.create(
            input=chunk,
            model='text-embedding-3-small'
        )
        embeded.append({
            "content": chunk,
            "embedding": response.data[0].embedding
        })
    return embeded


if __name__ == "__main__":
    with open('tamer_knowledge_base.txt', 'r', encoding='utf-8') as f:
        resume_text = f.read()

    chunks = chunk_text(resume_text)
    embedded = embed_chunk(chunks)

    with open('tamer_knowledge_base_chunk.json', 'w', encoding='utf-8') as f:
        json.dump(embedded, f)

    print(f"✅ Embedded {len(embedded)} chunks into tamer_knowledge_base_chunk.json")