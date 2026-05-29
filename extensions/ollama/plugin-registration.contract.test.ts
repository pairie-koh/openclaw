// Tests extensions/ollama plugin registration contract test behavior.
import { describePluginRegistrationContract } from "openclaw/plugin-sdk/plugin-test-contracts";

describePluginRegistrationContract({
  pluginId: "ollama",
  providerIds: ["ollama", "ollama-cloud"],
  webSearchProviderIds: ["ollama"],
});
