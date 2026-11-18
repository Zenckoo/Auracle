// Turns the answers (120 or 300) into trait scores, facet scores, percentiles and a four-letter type.

import { FACETS } from '../data/ipip120.js';
import { trialItems } from '../data/trials.js';
import { DOMAIN_CUTS, FACET_NORMS } from '../data/norms.js';

export const DOMAIN_ORDER = ['O', 'C', 'E', 'A', 'N'];

function clampPercentile(p) {
  return Math.max(1, Math.min(99, Math.round(p)));
}

// Place a 0-100 domain score between the reference cut-points.
function domainPercentile(domain, score) {
  const [p10, p25, p50, p75, p90] = DOMAIN_CUTS[domain];
  const points = [[0, 0], [p10, 10], [p25, 25], [p50, 50], [p75, 75], [p90, 90], [100, 100]];
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x0, y0] = points[i - 1];
    if (score <= x1) {
      if (x1 === x0) return clampPercentile(y1);
      return clampPercentile(y0 + ((score - x0) / (x1 - x0)) * (y1 - y0));
    }
  }
  return 99;
}

// Normal distribution, for facets (mean and standard deviation).
function normalCdf(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

function facetPercentile(domain, facetIndex, raw) {
  const [mean, sd] = FACET_NORMS[domain][facetIndex];
  return clampPercentile(normalCdf((raw - mean) / sd) * 100);
}

// Works for both trials. Domain scores use a 0-100 scale (share of the maximum),
// and facet scores are brought back to the 0-16 scale of the reference table before the percentile.
// For the Grand Trial (10 items per facet), this uses the same reference group as the Standard Trial:
// a close estimate until Auracle has its own local norms.
export function computeScores(answers, version = 'standard') {
  const items = trialItems(version);
  const facetSums = {};
  const facetCounts = {};
  for (const d of DOMAIN_ORDER) {
    facetSums[d] = [0, 0, 0, 0, 0, 0];
    facetCounts[d] = [0, 0, 0, 0, 0, 0];
  }

  items.forEach(([, domain, facet, keyed], i) => {
    facetCounts[domain][facet - 1] += 1;
    const answer = answers[i];
    if (!answer) return;
    const points = keyed > 0 ? answer - 1 : 5 - answer; // 0 to 4
    facetSums[domain][facet - 1] += points;
  });

  const domains = {};
  const facets = {};
  for (const d of DOMAIN_ORDER) {
    const total = facetSums[d].reduce((a, b) => a + b, 0);
    const max = facetCounts[d].reduce((a, b) => a + b, 0) * 4;
    const score = Math.round((total / max) * 100);
    domains[d] = { score, percentile: domainPercentile(d, score) };
    facets[d] = facetSums[d].map((raw, i) => {
      const onReferenceScale = (raw * 16) / (facetCounts[d][i] * 4);
      return { raw, percentile: facetPercentile(d, i, onReferenceScale) };
    });
  }

  return { domains, facets };
}

// Four letters, compared to the middle of the reference group (50th percentile).
export function computeType(scores) {
  const p = (d) => scores.domains[d].percentile;
  return (p('E') >= 50 ? 'E' : 'I') + (p('O') >= 50 ? 'N' : 'S') + (p('A') >= 50 ? 'F' : 'T') + (p('C') >= 50 ? 'J' : 'P');
}

// Letters close to the middle (45 to 55): the person may feel like the other letter some days.
export function closeLetters(scores, type) {
  const pairs = [
    ['E', 0, 'E', 'I'],
    ['O', 1, 'N', 'S'],
    ['A', 2, 'F', 'T'],
    ['C', 3, 'J', 'P'],
  ];
  const close = [];
  for (const [domain, position, high, low] of pairs) {
    const pct = scores.domains[domain].percentile;
    if (pct >= 45 && pct <= 55) {
      const other = type[position] === high ? low : high;
      const alternate = type.slice(0, position) + other + type.slice(position + 1);
      close.push({ pair: `${low}/${high}`, alternate });
    }
  }
  return close;
}

// Hidden secrets: the facets furthest from their own trait, biggest gap first.
export function hiddenSecrets(scores, count = 3) {
  const all = [];
  for (const d of DOMAIN_ORDER) {
    const traitPct = scores.domains[d].percentile;
    scores.facets[d].forEach((f, i) => {
      all.push({ domain: d, index: i, name: FACETS[d][i], facetPct: f.percentile, traitPct, gap: Math.abs(f.percentile - traitPct) });
    });
  }
  return all.sort((a, b) => b.gap - a.gap).slice(0, count);
}

export function traitLevel(percentile) {
  if (percentile < 35) return 'low';
  if (percentile > 65) return 'high';
  return 'average';
}

// Gentle help message: Anxiety (N facet 1) or Depression (N facet 3) above 90%.
export function needsGentleWord(scores) {
  return scores.facets.N[0].percentile > 90 || scores.facets.N[2].percentile > 90;
}

export function bar(percentile) {
  const filled = Math.max(0, Math.min(10, Math.round(percentile / 10)));
  return '▰'.repeat(filled) + '▱'.repeat(10 - filled);
}
