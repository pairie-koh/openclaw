/** Network policy passed to guarded fetch helpers for remote memory providers. */
export type SsrFPolicy = {
  /** Allow private network ranges when the caller owns the target endpoint. */
  allowPrivateNetwork?: boolean;
  /** Explicitly bypass private network blocking for trusted local deployments. */
  dangerouslyAllowPrivateNetwork?: boolean;
  /** Allow RFC 2544 benchmarking addresses used by some lab environments. */
  allowRfc2544BenchmarkRange?: boolean;
  /** Allow IPv6 unique-local addresses for private network deployments. */
  allowIpv6UniqueLocalRange?: boolean;
  /** Exact hostnames allowed in addition to the default policy. */
  allowedHostnames?: string[];
  /** Legacy hostname allowlist accepted by older callers. */
  hostnameAllowlist?: string[];
};
