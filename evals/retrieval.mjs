import fs from 'fs';
import { getRelevantChunks } from '../lib/chatHandler.js';

const cases = JSON.parse(
  fs.readFileSync(
    new URL('./questions.json', import.meta.url),
    'utf-8',
  ),
);

const headingOf = (chunk) => chunk.content.split('\n')[0];

const matches = (heading, expected) =>
  expected.some((text) => heading.includes(text));

let passed = 0;
let rankedFirst = 0;

for (const c of cases) {
  const headings = (
    await getRelevantChunks(c.question)
  ).map(headingOf);

  let ok;
  let first = false;
  if (c.expectNone) {
    ok = headings.length === 0;
  } else {
    ok = headings.some((h) => matches(h, c.expect));
    first =
      headings.length > 0 && matches(headings[0], c.expect);
    if (first) rankedFirst += 1;
  }
  if (ok) passed += 1;

  const mark = !ok
    ? 'FAIL'
    : !c.expectNone && !first
      ? 'PASS*'
      : 'PASS';
  console.log(`${mark.padEnd(5)}  ${c.question}`);
  if (mark !== 'PASS') {
    console.log(
      `     top: ${headings[0] ?? '(nothing above the cutoff)'}`,
    );
  }
}

const answerable = cases.filter(
  (c) => !c.expectNone,
).length;
console.log(
  `\n${passed}/${cases.length} passed. ` +
    `Expected section ranked first for ${rankedFirst}/${answerable} answerable questions.`,
);
