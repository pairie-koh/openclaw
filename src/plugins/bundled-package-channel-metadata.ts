import { listChannelCatalogEntries } from "./channel-catalog-registry.js";
import type { PluginPackageChannel } from "./manifest.js";

/** Lists bundled package channel metadata from the channel catalog registry. */
export function listBundledPackageChannelMetadata(): readonly PluginPackageChannel[] {
  return listChannelCatalogEntries({ origin: "bundled" }).map((entry) => entry.channel);
}

/** Finds bundled package channel metadata by canonical id or alias. */
export function findBundledPackageChannelMetadata(
  channelId: string,
): PluginPackageChannel | undefined {
  return listBundledPackageChannelMetadata().find(
    (channel) => channel.id === channelId || channel.aliases?.includes(channelId),
  );
}
