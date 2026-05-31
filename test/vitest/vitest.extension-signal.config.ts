import { createSingleChannelExtensionVitestConfig } from "./vitest.extension-channel-single-config.ts";

/** Create the scoped Vitest config for Signal plugin tests. */
export function createExtensionSignalVitestConfig(
  env: Record<string, string | undefined> = process.env,
) {
  return createSingleChannelExtensionVitestConfig("signal", env);
}

export default createExtensionSignalVitestConfig();
