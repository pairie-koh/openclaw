import { describe, expect, it, vi } from "vitest";
import { MAX_TIMER_TIMEOUT_MS } from "../shared/number-coercion.js";
import { summarizeText } from "./tts-core.js";

describe("TTS core", () => {
  it("clamps oversized summarization timeout timers", async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    try {
      const model = { provider: { id: "test-provider" } };
      const config = {
        summaryModel: "test-provider/test-model",
      } as Parameters<typeof summarizeText>[0]["config"];

      const result = await summarizeText(
        {
          text: "Long text that should be summarized for speech.",
          targetLength: 120,
          cfg: {},
          config,
          timeoutMs: MAX_TIMER_TIMEOUT_MS + 1,
        },
        {
          completeSimple: vi.fn(async () => ({
            role: "assistant",
            api: "chat",
            provider: "test-provider",
            model: "test-model",
            timestamp: Date.now(),
            content: [{ type: "text", text: "Short summary." }],
            stopReason: "stop",
            usage: {},
          })),
          getApiKeyForModel: vi.fn(async () => ({
            apiKey: "key",
            mode: "api-key",
            source: "test",
          })),
          prepareModelForSimpleCompletion: vi.fn(() => model as never),
          requireApiKey: vi.fn(() => "key"),
          resolveModelAsync: vi.fn(async () => ({
            model,
            authStorage: {} as never,
            modelRegistry: {} as never,
          })),
        } as unknown as Parameters<typeof summarizeText>[1],
      );

      expect(result.summary).toBe("Short summary.");
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), MAX_TIMER_TIMEOUT_MS);
    } finally {
      setTimeoutSpy.mockRestore();
    }
  });
});
