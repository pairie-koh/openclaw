import type { EmbeddingBatchOutputLine } from "./batch-output.js";

/** Minimal provider batch status shape shared by embedding batch pollers. */
export type EmbeddingBatchStatus = {
  id?: string;
  status?: string;
  output_file_id?: string | null;
  error_file_id?: string | null;
};

/** Provider output lines use the canonical embedding batch output contract. */
export type ProviderBatchOutputLine = EmbeddingBatchOutputLine;

/** OpenAI-compatible batch endpoint for embedding requests. */
export const EMBEDDING_BATCH_ENDPOINT = "/v1/embeddings";
