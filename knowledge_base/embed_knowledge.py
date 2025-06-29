import openai
import tiktoken
import json
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

def tokenize(text, model='text-embedding-3-small'):
    tokenizer = tiktoken.encoding_for_model(model)
    return tokenizer.encode(text)

def chunk_text(text, max_tokens=200):
    paragraphs = text.split('\n')
    chunks = []
    current_chunk = ''

    for para in paragraphs:
        if not para.strip():
            continue

        temp = current_chunk + ' ' + para
        if len(tokenize(temp)) < max_tokens:
            current_chunk = temp
        else:
            chunks.append(current_chunk.strip())
            current_chunk = para

    if current_chunk:
        chunks.append(current_chunk.strip())
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