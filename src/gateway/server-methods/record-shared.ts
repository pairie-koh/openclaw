export { asOptionalRecord as asRecord } from "../../../packages/normalization-core/src/record-coerce.js";

/** Reused helper for normalize Trimmed String behavior in src/gateway/server-methods. */
export function normalizeTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
