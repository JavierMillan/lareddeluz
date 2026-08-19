export const CHAPTER_IDS = ["d", "e", "s", "p", "ej", "g", "a"] as const;
export type ChapterId = (typeof CHAPTER_IDS)[number];

export function chapterFromHash(hash: string) {
  const id = hash.replace(/^#/, "") as ChapterId;
  const index = CHAPTER_IDS.indexOf(id);
  return index < 0 ? 0 : index;
}

export function moveChapter(index: number, delta: -1 | 1) {
  return Math.max(0, Math.min(CHAPTER_IDS.length - 1, index + delta));
}

export function writeChapterHash(id: ChapterId) {
  window.history.replaceState(null, "", `#${id}`);
}
