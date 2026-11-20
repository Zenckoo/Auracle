// Reference groups used to say "Higher than X% of travelers".
//
// Traits (domains): Twomey, C., & Johnson, J. A. (2022). Open-source personality trait norms for the
// United Kingdom and Ireland. European Journal of Psychological Assessment, 38(6), 432-439.
// https://doi.org/10.1027/1015-5759/a000644 . Open tables (free to reuse and modify): https://osf.io/tbmh5
// IPIP-NEO-300, 18,591 people. Auracle uses the average of the two youngest groups (14-17 and 18-29 years),
// closest to Discord travelers. Their sums (60-300) are turned into Auracle's 0-100 scale: (sum - 60) / 240 * 100.
//
// Facets: JobCannon (2026), IPIP-NEO-120 technical manual, edition 2026-10-23,
// https://jobcannon.io/research/ipip-neo-120, licensed CC BY 4.0 (about 3,000 online test takers).
//
// Domain scores are on a 0-100 scale: (sum of the answers scored 0-4) / (4 x number of answers) * 100.
// Facet scores are raw sums of 4 answers scored 0-4, so 0-16.

// Mean and standard deviation for each domain (0-100).
export const DOMAIN_NORMS = {
  O: [67.7, 10.8],
  C: [55.9, 12.8],
  E: [59.4, 13.9],
  A: [60.5, 12.3],
  N: [51.4, 15.5],
};

// Mean and standard deviation for each facet (0-16), in facet order 1 to 6.
export const FACET_NORMS = {
  N: [[9.0, 4.1], [7.0, 4.0], [6.3, 4.0], [8.1, 4.0], [7.6, 3.7], [6.1, 3.9]],
  E: [[8.4, 4.1], [6.0, 4.1], [9.7, 3.7], [8.0, 3.5], [7.8, 3.7], [10.1, 3.6]],
  O: [[11.6, 3.6], [11.0, 3.5], [10.9, 3.4], [8.9, 3.5], [11.6, 3.4], [8.6, 3.3]],
  A: [[8.2, 3.7], [12.3, 3.5], [11.4, 3.3], [12.2, 3.5], [8.6, 3.9], [10.4, 3.6]],
  C: [[11.2, 3.3], [8.6, 4.6], [11.6, 2.9], [11.0, 3.5], [8.8, 3.7], [10.2, 4.3]],
};
