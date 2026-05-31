import { createScopedVitestConfig } from "./vitest.scoped-config.ts";
import { autoReplyTopLevelReplyTestInclude } from "./vitest.test-shards.mjs";

/** Create the scoped Vitest config for top-level auto-reply tests. */
export function createAutoReplyTopLevelVitestConfig(env?: Record<string, string | undefined>) {
  return createScopedVitestConfig([...autoReplyTopLevelReplyTestInclude], {
    dir: "src/auto-reply",
    env,
    name: "auto-reply-top-level",
  });
}

export default createAutoReplyTopLevelVitestConfig();
