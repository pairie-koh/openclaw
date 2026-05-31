import { createScopedVitestConfig } from "./vitest.scoped-config.ts";

/** Create the scoped Vitest config for core media tests. */
export function createMediaVitestConfig(env?: Record<string, string | undefined>) {
  return createScopedVitestConfig(["src/media/**/*.test.ts"], {
    dir: "src",
    env,
    name: "media",
    passWithNoTests: true,
  });
}

export default createMediaVitestConfig();
