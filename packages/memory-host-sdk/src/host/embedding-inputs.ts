/** Text-only embedding input part used by structured multimodal requests. */
export type EmbeddingInputTextPart = {
  type: "text";
  text: string;
};

/** Inline binary/text payload encoded as data plus its MIME type for embedding providers. */
export type EmbeddingInputInlineDataPart = {
  type: "inline-data";
  mimeType: string;
  data: string;
};

/** One structured embedding input part, either text or inline data. */
export type EmbeddingInputPart = EmbeddingInputTextPart | EmbeddingInputInlineDataPart;

/** Provider-neutral embedding input with plain text and optional structured parts. */
export type EmbeddingInput = {
  text: string;
  parts?: EmbeddingInputPart[];
};

/** Build the common text-only embedding input shape. */
export function buildTextEmbeddingInput(text: string): EmbeddingInput {
  return { text };
}

/** Narrow a structured embedding part to inline data. */
export function isInlineDataEmbeddingInputPart(
  part: EmbeddingInputPart,
): part is EmbeddingInputInlineDataPart {
  return part.type === "inline-data";
}

/** Return true when an embedding input contains provider-visible non-text parts. */
export function hasNonTextEmbeddingParts(input: EmbeddingInput | undefined): boolean {
  if (!input?.parts?.length) {
    return false;
  }
  return input.parts.some((part) => isInlineDataEmbeddingInputPart(part));
}
