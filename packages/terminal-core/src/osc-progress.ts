const OSC_PROGRESS_PREFIX = "\u001b]9;4;";
const OSC_PROGRESS_ST = "\u001b\\";
const OSC_PROGRESS_BEL = "\u0007";
const OSC_PROGRESS_C1_ST = "\u009c";

/** Terminal progress controller backed by OSC 9;4 when supported. */
export type OscProgressController = {
  /** Show indeterminate progress with a sanitized label. */
  setIndeterminate: (label: string) => void;
  /** Show bounded progress after clamping percent to 0..100. */
  setPercent: (label: string, percent: number) => void;
  /** Clear the terminal progress indicator, preserving the last label for terminal UX. */
  clear: () => void;
};

/** Detect terminals known to support OSC 9;4 progress notifications. */
export function supportsOscProgress(env: NodeJS.ProcessEnv, isTty: boolean): boolean {
  if (!isTty) {
    return false;
  }
  const termProgram = (env.TERM_PROGRAM ?? "").toLowerCase();
  return (
    termProgram.includes("ghostty") || termProgram.includes("wezterm") || Boolean(env.WT_SESSION)
  );
}

function sanitizeOscProgressLabel(label: string): string {
  return label
    .replaceAll(OSC_PROGRESS_ST, "")
    .replaceAll(OSC_PROGRESS_BEL, "")
    .replaceAll(OSC_PROGRESS_C1_ST, "")
    .split("\u001b")
    .join("")
    .replaceAll("]", "")
    .trim();
}

function formatOscProgress(state: number, percent: number | null, label: string): string {
  const cleanLabel = sanitizeOscProgressLabel(label);
  if (percent === null) {
    return `${OSC_PROGRESS_PREFIX}${state};;${cleanLabel}${OSC_PROGRESS_ST}`;
  }
  const normalizedPercent = Math.max(0, Math.min(100, Math.round(percent)));
  return `${OSC_PROGRESS_PREFIX}${state};${normalizedPercent};${cleanLabel}${OSC_PROGRESS_ST}`;
}

/** Create a no-op controller unless the terminal advertises OSC progress support. */
export function createOscProgressController(params: {
  env: NodeJS.ProcessEnv;
  isTty: boolean;
  write: (chunk: string) => void;
}): OscProgressController {
  if (!supportsOscProgress(params.env, params.isTty)) {
    return {
      setIndeterminate: () => {},
      setPercent: () => {},
      clear: () => {},
    };
  }

  let lastLabel = "";

  return {
    setIndeterminate: (label: string) => {
      lastLabel = label;
      params.write(formatOscProgress(3, null, label));
    },
    setPercent: (label: string, percent: number) => {
      lastLabel = label;
      params.write(formatOscProgress(1, percent, label));
    },
    clear: () => {
      params.write(formatOscProgress(0, 0, lastLabel));
    },
  };
}
