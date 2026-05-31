import { createScopedVitestConfig } from "./vitest.scoped-config.ts";

/** Creates the daemon Vitest project config. */
export function createDaemonVitestConfig(env?: Record<string, string | undefined>) {
  return createScopedVitestConfig(["src/daemon/**/*.test.ts"], {
    dir: "src",
    env,
    name: "daemon",
    passWithNoTests: true,
  });
}

export default createDaemonVitestConfig();
