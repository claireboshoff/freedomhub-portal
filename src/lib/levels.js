/**
 * Academy Level System — XP thresholds, titles, and helpers.
 */

export const LEVEL_DATA = [
  { level: 1, xp: 0, title: 'Newcomer' },
  { level: 2, xp: 100, title: 'Explorer' },
  { level: 3, xp: 300, title: 'Learner' },
  { level: 4, xp: 600, title: 'Achiever' },
  { level: 5, xp: 1000, title: 'Rising Star' },
  { level: 6, xp: 1500, title: 'Knowledge Seeker' },
  { level: 7, xp: 2500, title: 'Trailblazer' },
  { level: 8, xp: 4000, title: 'Expert' },
  { level: 9, xp: 6000, title: 'Master' },
  { level: 10, xp: 10000, title: 'Legend' },
];

/** Get title for a given level number */
export function getLevelTitle(level) {
  const entry = LEVEL_DATA.find((l) => l.level === level);
  return entry ? entry.title : 'Newcomer';
}

/** Get the XP required for a given level */
export function getLevelXP(level) {
  const entry = LEVEL_DATA.find((l) => l.level === level);
  return entry ? entry.xp : 0;
}

/** Get the next level's XP threshold (returns null at max) */
export function getNextLevelXP(level) {
  const next = LEVEL_DATA.find((l) => l.level === level + 1);
  return next ? next.xp : null;
}

/** Get the next level's title (returns null at max) */
export function getNextLevelTitle(level) {
  const next = LEVEL_DATA.find((l) => l.level === level + 1);
  return next ? next.title : null;
}

/** Calculate progress percentage toward the next level */
export function getLevelProgress(xp, level) {
  const currentThreshold = getLevelXP(level);
  const nextThreshold = getNextLevelXP(level);
  if (nextThreshold === null) return 100; // max level
  const range = nextThreshold - currentThreshold;
  const progress = xp - currentThreshold;
  return Math.min(100, Math.max(0, (progress / range) * 100));
}
