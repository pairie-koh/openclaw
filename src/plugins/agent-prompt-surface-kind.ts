import type { AgentPromptSurfaceKind } from "./types.js";

/** Normalizes legacy Pi prompt-surface naming to the canonical OpenClaw main surface. */
export function normalizeAgentPromptSurfaceKind(
  surface: AgentPromptSurfaceKind,
): AgentPromptSurfaceKind {
  return surface === "pi_main" ? "openclaw_main" : surface;
}

/** Returns true for the canonical main agent prompt surface, including legacy aliases. */
export function isOpenClawMainPromptSurface(surface: AgentPromptSurfaceKind): boolean {
  return normalizeAgentPromptSurfaceKind(surface) === "openclaw_main";
}
