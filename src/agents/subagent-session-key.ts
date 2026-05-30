import { normalizeOptionalString } from "../../packages/normalization-core/src/string-coerce.js";

/** Normalizes optional subagent session keys before registry and store lookups. */
export const normalizeSubagentSessionKey = normalizeOptionalString;
