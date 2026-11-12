import fs from 'fs';
import { chatHandler } from '../lib/chatHandler.js';

const cases = JSON.parse(
  fs.readFileSync(
    new URL('./answers.json', import.meta.url),
    'utf-8',
  ),
);

const NO_ANSWER = [
  /I don't know based on the info I have/i,
  /only set up to answer questions about Tamer/i,
];

const findProblems = (reply, c) => {
  const text = reply.toLowerCase();
  const problems = [];
  for (const item of c.mustInclude ?? []) {
    const options = Array.isArray(item) ? item : [item];
    if (
      !options.some((o) => text.includes(o.toLowerCase()))
    ) {
      problems.push(`missing: ${options.join(' / ')}`);
    }
  }
  for (const pattern of c.mustNotMatch ?? []) {
    if (new RegExp(pattern, 'i').test(reply)) {
      problems.push(`should not match: ${pattern}`);
    }
  }
  if (
    c.answerable &&
    NO_ANSWER.some((r) => r.test(reply))
  ) {
    problems.push('gave a no-answer reply');
  }
  return problems;
};

const quietly = async (fn) => {
  const log = console.log;
  console.log = () => {};
  try {
    return await fn();
  } finally {
    console.log = log;
  }
};

let passed = 0;
let totalMs = 0;

for (const c of cases) {
  const messages = [
    ...(c.history ?? []),
    { role: 'user', content: c.question },
  ];
  const started = Date.now();
  const reply = await quietly(() => chatHandler(messages));
  totalMs += Date.now() - started;

  const problems = findProblems(reply, c);
  if (problems.length === 0) passed += 1;

  console.log(
    `${problems.length === 0 ? 'PASS' : 'FAIL'}  [${c.group}] ${c.question}`,
  );
  for (const p of problems) console.log(`     ${p}`);
  if (problems.length > 0) {
    console.log(
      `       reply: ${reply.replace(/\s+/g, ' ').slice(0, 300)}`,
    );
  }
}

console.log(
  `\n${passed}/${cases.length} passed. ` +
    `Average ${(totalMs / cases.length / 1000).toFixed(1)}s per answer.`,
);
