/**
 * Tiny session flag so entrance choreography (preloader → hero) only
 * orchestrates once per session; client-side navigations stay snappy.
 */
const KEY = "__sfcw_loaded";

export function markLoaded() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* private mode — ignore */
  }
}

export function isLoaded(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
