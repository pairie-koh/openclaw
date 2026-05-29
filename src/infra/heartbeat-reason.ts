import { normalizeOptionalString } from "@openclaw/normalization-core/string-coerce";

/** Reused helper for normalize Heartbeat Wake Reason behavior in src/infra. */
export function normalizeHeartbeatWakeReason(reason?: string): string {
  return normalizeOptionalString(reason) ?? "requested";
}
