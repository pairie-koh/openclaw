/**
 * Named Vitest mock function type that avoids leaking inferred `vi.fn()` module
 * paths. The callable bound stays permissive because Vitest anchors mocks to an
 * `any`-based Procedure type.
 */
// oxlint-disable-next-line typescript/no-explicit-any
export type MockFn<T extends (...args: any[]) => any = (...args: any[]) => any> =
  import("vitest").Mock<T>;
