import { normalizeOptionalStringifiedId } from "@openclaw/normalization-core/string-coerce";

/** Converts a non-empty thread id value into its string form. */
export function normalizeOutboundThreadId(value?: string | number | null): string | undefined {
  return normalizeOptionalStringifiedId(value);
}
