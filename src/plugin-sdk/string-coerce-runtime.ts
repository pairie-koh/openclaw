// Narrow primitive coercion helpers for plugins that do not need the full text-runtime barrel.

/** String coercion helpers kept in this narrow barrel for plugin runtime code. */
export {
  hasNonEmptyString,
  localeLowercasePreservingWhitespace,
  lowercasePreservingWhitespace,
  normalizeFastMode,
  normalizeLowercaseStringOrEmpty,
  normalizeNullableString,
  normalizeOptionalLowercaseString,
  normalizeOptionalString,
  normalizeOptionalStringifiedId,
  normalizeStringifiedEntries,
  normalizeStringifiedOptionalString,
  readStringValue,
} from "../../packages/normalization-core/src/string-coerce.js";
export {
  asFiniteNumberInRange,
  asFiniteNumber,
  asPositiveSafeInteger,
  asSafeIntegerInRange,
  parseFiniteNumber,
  parseStrictFiniteNumber,
  parseStrictInteger,
  parseStrictNonNegativeInteger,
  parseStrictPositiveInteger,
} from "../../packages/normalization-core/src/number-coercion.js";
export { asBoolean, parseBooleanValue } from "../utils/boolean.js";
/** Record guards and field readers for plugin boundary normalization. */
export {
  asRecord,
  asNullableRecord,
  asOptionalRecord,
  readStringField,
} from "../../packages/normalization-core/src/record-coerce.js";
export { isRecord } from "../utils.js";
/** Stable string-list normalization helpers for plugin manifests and config. */
export {
  normalizeAtHashSlug,
  normalizeHyphenSlug,
  normalizeOptionalTrimmedStringList,
  normalizeSortedUniqueTrimmedStringList,
  normalizeSingleOrTrimmedStringList,
  normalizeStringEntries,
  normalizeStringEntriesLower,
  normalizeUniqueStringEntries,
  normalizeUniqueTrimmedStringList,
  normalizeTrimmedStringList,
  sortUniqueStrings,
  uniqueStrings,
  uniqueValues,
} from "../../packages/normalization-core/src/string-normalization.js";
export { summarizeStringEntries } from "../shared/string-sample.js";
