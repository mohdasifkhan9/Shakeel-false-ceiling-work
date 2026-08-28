/**
 * ─────────────────────────────────────────────────────────────
 *  CLIENT REVIEWS
 *  No reviews have been supplied yet. Per our content policy we
 *  NEVER fabricate testimonials — this list stays empty until
 *  genuine Google reviews are provided. The <Reviews /> section
 *  renders its honest editorial state while this array is empty,
 *  and automatically upgrades to the full rating + carousel once
 *  real reviews (and a verified rating) are added here.
 * ─────────────────────────────────────────────────────────────
 */

export interface Review {
  quote: string;
  author: string;
  rating: number; // 1–5
  source: "Google";
}

export const googleRating: number | null = null; // set once verified, e.g. 4.9
export const googleReviewCount: number | null = null;

export const reviews: Review[] = [];
