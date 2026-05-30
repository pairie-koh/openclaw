import { normalizeOptionalString } from "@openclaw/normalization-core/string-coerce";

/** Returns a trimmed heartbeat wake reason, defaulting to requested. */
export function normalizeHeartbeatWakeReason(reason?: string): string {
  return normalizeOptionalString(reason) ?? "requested";
}
