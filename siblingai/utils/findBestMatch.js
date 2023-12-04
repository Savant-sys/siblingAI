// utils/findBestMatch.js
import stringSimilarity from 'string-similarity';

function findBestMatch(input, possibilities) {
  const matches = stringSimilarity.findBestMatch(input, possibilities);
  return matches.bestMatch.target;
}

export default findBestMatch;
