// Reference group used to say "Higher than X% of travelers".
// Source: JobCannon (2026), IPIP-NEO-120 technical manual, edition 2026-10-23,
// https://jobcannon.io/research/ipip-neo-120, licensed CC BY 4.0.
// Sample: about 3,000 self-selected online test takers (not a general-population norm).
// Plan: switch to Auracle's own local norms once enough travelers have taken the trial.
//
// Domain scores are on a 0-100 scale: (sum of 24 answers scored 0-4) / 96 * 100.
// Facet scores are raw sums of 4 answers scored 0-4, so 0-16.

// Percentile cut-points for each domain: P10, P25, P50, P75, P90.
export const DOMAIN_CUTS = {
  O: [49, 57, 66, 74, 81],
  C: [43, 53, 65, 75, 84],
  E: [31, 42, 52, 64, 73],
  A: [47, 57, 68, 76, 83],
  N: [23, 33, 46, 58, 69],
};

// Mean and standard deviation for each facet (0-16), in facet order 1 to 6.
export const FACET_NORMS = {
  N: [[9.0, 4.1], [7.0, 4.0], [6.3, 4.0], [8.1, 4.0], [7.6, 3.7], [6.1, 3.9]],
  E: [[8.4, 4.1], [6.0, 4.1], [9.7, 3.7], [8.0, 3.5], [7.8, 3.7], [10.1, 3.6]],
  O: [[11.6, 3.6], [11.0, 3.5], [10.9, 3.4], [8.9, 3.5], [11.6, 3.4], [8.6, 3.3]],
  A: [[8.2, 3.7], [12.3, 3.5], [11.4, 3.3], [12.2, 3.5], [8.6, 3.9], [10.4, 3.6]],
  C: [[11.2, 3.3], [8.6, 4.6], [11.6, 2.9], [11.0, 3.5], [8.8, 3.7], [10.2, 4.3]],
};
