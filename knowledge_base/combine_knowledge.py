files_to_merge = ["tamer_resume.txt", "tamer_github.txt", "tamer_notes.txt"]
output_file = "tamer_knowledge_base.txt"

with open(output_file, "w", encoding="utf-8") as outfile:
    for fname in files_to_merge:
        with open(fname, "r", encoding="utf-8") as infile:
            outfile.write(f"--- {fname} ---\n")
            outfile.write(infile.read())
            outfile.write("\n\n")

print(f"✅ Combined into {output_file}")