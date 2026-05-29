import { resolveIntegerOption as resolveSharedIntegerOption } from "@openclaw/normalization-core/number-coercion";

/** Resolve an integer option with ACP call-site naming. */
export function resolveIntegerOption(
  value: number | undefined,
  fallback: number,
  params: { min: number },
): number {
  return resolveSharedIntegerOption(value, fallback, params);
}
