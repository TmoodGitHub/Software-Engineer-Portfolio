import { execSync } from "child_process";
import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";

const repos = [
  {
    url: "https://github.com/TmoodGitHub/TmoodGitHub",
    name: "TmoodGitHub",
  },
];

const tempDir = "./temp";
const outPath = "./tamer_github.txt";
let allContent = "";

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

for (const { url, name } of repos) {
  const clonePath = `${tempDir}/${name}`;

  if (fs.existsSync(clonePath)) {
    console.log(`🧹 Removing old ${name}...`);
    await fsExtra.remove(clonePath);
  }

  console.log(`🔄 Cloning ${name}...`);
  execSync(`git clone --depth=1 ${url} ${clonePath}`);

  const readmePath = path.join(clonePath, "README.md");
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, "utf-8");
    allContent += `# ${name}\n\n${readme}\n\n---\n\n`;
    console.log(`✅ Extracted README from ${name}`);
  } else {
    console.warn(`⚠️ README.md not found in ${name}`);
  }

  console.log(`🧹 Cleaning up ${name}...`);
  await fsExtra.remove(clonePath);
}

fs.writeFileSync(outPath, allContent);
console.log(`\n✅ Done! All READMEs saved to ${outPath}`);
