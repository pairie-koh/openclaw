import { normalizeLowercaseStringOrEmpty } from "./string-utils.js";

/** Identifies provider missing-key errors from the runtime error message contract. */
export function isMissingEmbeddingApiKeyError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("No API key found for provider");
}

/**
 * Returns deterministic cache header tuples after removing auth/cache-unsafe names.
 * Header names are normalized only for exclusion checks; original casing is preserved.
 */
export function sanitizeEmbeddingCacheHeaders(
  headers: Record<string, string>,
  excludedHeaderNames: string[],
): Array<[string, string]> {
  const excluded = new Set(
    excludedHeaderNames.map((name) => normalizeLowercaseStringOrEmpty(name)),
  );
  return Object.entries(headers)
    .filter(([key]) => !excluded.has(normalizeLowercaseStringOrEmpty(key)))
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => [key, value]);
}

/** Restores batch embeddings to request order using numeric custom ids from providers. */
export function mapBatchEmbeddingsByIndex(
  byCustomId: Map<string, number[]>,
  count: number,
): number[][] {
  const embeddings: number[][] = [];
  for (let index = 0; index < count; index += 1) {
    embeddings.push(byCustomId.get(String(index)) ?? []);
  }
  return embeddings;
}
