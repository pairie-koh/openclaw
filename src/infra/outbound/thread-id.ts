import { normalizeOptionalStringifiedId } from "@openclaw/normalization-core/string-coerce";

/** Reused helper for normalize Outbound Thread Id behavior in src/infra/outbound. */
export function normalizeOutboundThreadId(value?: string | number | null): string | undefined {
  return normalizeOptionalStringifiedId(value);
}
