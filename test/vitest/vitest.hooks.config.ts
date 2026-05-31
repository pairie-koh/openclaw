import { createScopedVitestConfig } from "./vitest.scoped-config.ts";

/** Create the scoped Vitest config for hook tests. */
export function createHooksVitestConfig(env?: Record<string, string | undefined>) {
  return createScopedVitestConfig(["src/hooks/**/*.test.ts"], {
    dir: "src/hooks",
    env,
    name: "hooks",
    passWithNoTests: true,
  });
}

export default createHooksVitestConfig();
