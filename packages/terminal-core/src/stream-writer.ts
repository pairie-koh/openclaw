/** Hooks for safe terminal writes that may encounter closed pipes. */
export type SafeStreamWriterOptions = {
  /** Called immediately before each attempted write. */
  beforeWrite?: () => void;
  /** Called once when stdout/stderr reports EPIPE or EIO. */
  onBrokenPipe?: (err: NodeJS.ErrnoException, stream: NodeJS.WriteStream) => void;
};

/** Stateful writer that suppresses repeated writes after a terminal pipe closes. */
export type SafeStreamWriter = {
  /** Write text and return false when the stream is already closed or just broke. */
  write: (stream: NodeJS.WriteStream, text: string) => boolean;
  /** Write one line and return the same success flag as `write`. */
  writeLine: (stream: NodeJS.WriteStream, text: string) => boolean;
  /** Reopen the writer state for tests or process handoff after a prior pipe break. */
  reset: () => void;
  /** Report whether a previous EPIPE/EIO has closed this writer. */
  isClosed: () => boolean;
};

function isBrokenPipeError(err: unknown): err is NodeJS.ErrnoException {
  const code = (err as NodeJS.ErrnoException)?.code;
  return code === "EPIPE" || code === "EIO";
}

/** Create a stream writer that treats EPIPE/EIO as terminal shutdown instead of throwing. */
export function createSafeStreamWriter(options: SafeStreamWriterOptions = {}): SafeStreamWriter {
  let closed = false;
  let notified = false;

  const noteBrokenPipe = (err: NodeJS.ErrnoException, stream: NodeJS.WriteStream) => {
    if (notified) {
      return;
    }
    notified = true;
    options.onBrokenPipe?.(err, stream);
  };

  const handleError = (err: unknown, stream: NodeJS.WriteStream): boolean => {
    if (!isBrokenPipeError(err)) {
      throw err;
    }
    closed = true;
    noteBrokenPipe(err, stream);
    return false;
  };

  const write = (stream: NodeJS.WriteStream, text: string): boolean => {
    if (closed) {
      return false;
    }
    try {
      options.beforeWrite?.();
    } catch (err) {
      return handleError(err, process.stderr);
    }
    try {
      stream.write(text);
      return !closed;
    } catch (err) {
      return handleError(err, stream);
    }
  };

  const writeLine = (stream: NodeJS.WriteStream, text: string): boolean =>
    write(stream, `${text}\n`);

  return {
    write,
    writeLine,
    reset: () => {
      closed = false;
      notified = false;
    },
    isClosed: () => closed,
  };
}
