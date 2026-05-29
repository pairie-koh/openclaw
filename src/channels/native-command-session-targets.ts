import { normalizeLowercaseStringOrEmpty } from "@openclaw/normalization-core/string-coerce";

/** Inputs for resolving native command session and command-target keys. */
export type ResolveNativeCommandSessionTargetsParams = {
  agentId: string;
  sessionPrefix: string;
  userId: string;
  targetSessionKey: string;
  boundSessionKey?: string;
  lowercaseSessionKey?: boolean;
};

/** Resolve session keys used by native command dispatch. */
export function resolveNativeCommandSessionTargets(
  params: ResolveNativeCommandSessionTargetsParams,
) {
  const rawSessionKey =
    params.boundSessionKey ?? `agent:${params.agentId}:${params.sessionPrefix}:${params.userId}`;
  return {
    sessionKey: params.lowercaseSessionKey
      ? normalizeLowercaseStringOrEmpty(rawSessionKey)
      : rawSessionKey,
    commandTargetSessionKey: params.boundSessionKey ?? params.targetSessionKey,
  };
}
