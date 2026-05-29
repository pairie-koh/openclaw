import { parseStrictFiniteNumber } from "@openclaw/normalization-core/number-coercion";

/** Reused helper for coerce Finite Schedule Number behavior in src/cron. */
export function coerceFiniteScheduleNumber(value: unknown): number | undefined {
  return parseStrictFiniteNumber(value);
}
