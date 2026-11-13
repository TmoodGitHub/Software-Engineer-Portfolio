const STOPWORDS = new Set([
  'a',
  'about',
  'also',
  'an',
  'and',
  'any',
  'are',
  'as',
  'at',
  'be',
  'build',
  'built',
  'by',
  'can',
  'did',
  'do',
  'does',
  'experience',
  'for',
  'from',
  'get',
  'give',
  'has',
  'have',
  'he',
  'him',
  'his',
  'how',
  'i',
  'in',
  'is',
  'it',
  'its',
  'just',
  'know',
  'like',
  'many',
  'me',
  'more',
  'most',
  'now',
  'of',
  'on',
  'or',
  'tamer',
  'tell',
  'that',
  'the',
  'there',
  'think',
  'this',
  'to',
  'use',
  'used',
  'was',
  'what',
  'when',
  'where',
  'which',
  'who',
  'with',
  'work',
  'worked',
  'working',
  'years',
  'you',
  'your',
]);

const NAMES_ONLY_WHEN_CAPITALIZED = new Map([['go', 'Go']]);
const K1 = 1.2;
const B = 0.75;

export const tokenize = (text) =>
  (text.match(/[A-Za-z0-9][A-Za-z0-9+#.']*/g) ?? [])
    .map((word) =>
      word.replace(/'s$/i, '').replace(/[.']+$/, ''),
    )
    .filter((word) => {
      const name = NAMES_ONLY_WHEN_CAPITALIZED.get(
        word.toLowerCase(),
      );
      return !name || word === name;
    })
    .map((word) => word.toLowerCase())
    .filter((word) => word && !STOPWORDS.has(word));

export const buildKeywordIndex = (texts) => {
  const docs = texts.map(tokenize);
  const avgLength =
    docs.reduce((total, doc) => total + doc.length, 0) /
    docs.length;

  const docFreq = new Map();
  const termCounts = docs.map((doc) => {
    const counts = new Map();
    for (const word of doc)
      counts.set(word, (counts.get(word) ?? 0) + 1);
    for (const word of counts.keys()) {
      docFreq.set(word, (docFreq.get(word) ?? 0) + 1);
    }
    return counts;
  });

  const idf = (word) => {
    const n = docFreq.get(word) ?? 0;
    return Math.log(
      1 + (docs.length - n + 0.5) / (n + 0.5),
    );
  };

  return (question) => {
    const words = [...new Set(tokenize(question))];
    return termCounts.map((counts, i) =>
      words.reduce((score, word) => {
        const tf = counts.get(word) ?? 0;
        if (tf === 0) return score;
        const lengthNorm =
          1 - B + B * (docs[i].length / avgLength);
        return (
          score +
          (idf(word) * tf * (K1 + 1)) /
            (tf + K1 * lengthNorm)
        );
      }, 0),
    );
  };
};
