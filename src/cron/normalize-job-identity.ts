import { normalizeOptionalString } from "@openclaw/normalization-core/string-coerce";

/** Reused helper for normalize Cron Job Identity Fields behavior in src/cron. */
export function normalizeCronJobIdentityFields(raw: Record<string, unknown>): {
  mutated: boolean;
  legacyJobIdIssue: boolean;
} {
  const rawId = normalizeOptionalString(raw.id) ?? "";
  const legacyJobId = normalizeOptionalString(raw.jobId) ?? "";
  const hadJobIdKey = "jobId" in raw;
  const normalizedId = rawId || legacyJobId;
  const idChanged = Boolean(normalizedId && raw.id !== normalizedId);

  if (idChanged) {
    raw.id = normalizedId;
  }
  if (hadJobIdKey) {
    delete raw.jobId;
  }
  return { mutated: idChanged || hadJobIdKey, legacyJobIdIssue: hadJobIdKey };
}
