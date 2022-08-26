const BLUE_CHIP_COLLECTIONS = [
  "boredapeyachtclub",
  "mutant-ape-yacht-club",
  "doodles-official",
  "cryptopunks",
  "azuki",
  "proof-moonbirds",
  "clonex",
  "otherdeed",
  "goblintownwtf",
  "meebits",
  "sandbox",
];

const BLACK_CHIP_COLLECTIONS = ["ens", "urlz"];

const SAFELIST_REQUEST_STATUSES = [
  "not_requested",
  "requested",
  "approved",
  "verified",
];

export const isBlueChip = (slug: string) => {
  return BLUE_CHIP_COLLECTIONS.includes(slug);
};

export const isBlackChip = (slug: string) => {
  return BLACK_CHIP_COLLECTIONS.includes(slug);
};

export const sortCollections = (collections: any[], perPage: number) => {
  const cleanedCollections = collections.filter(
    (item) =>
      item.owned_asset_count <= perPage &&
      item.primary_asset_contracts.length > 0
  );

  const blueChipCollections = cleanedCollections
    .filter((item) => isBlueChip(item.slug))
    .sort((a, b) => {
      return a.slug.localeCompare(b.slug);
    });

  const blackChipCollections = cleanedCollections
    .filter((item) => isBlackChip(item.slug))
    .sort((a, b) => {
      return a.slug.localeCompare(b.slug);
    });

  const otherCollections = cleanedCollections
    .filter((item) => !isBlueChip(item.slug) && !isBlackChip(item.slug))
    .sort((a, b) => {
      if (a.safelist_request_status === b.safelist_request_status) {
        return a.slug.localeCompare(b.slug);
      }
      return (
        SAFELIST_REQUEST_STATUSES.indexOf(b.safelist_request_status) -
        SAFELIST_REQUEST_STATUSES.indexOf(a.safelist_request_status)
      );
    });

  return [...blueChipCollections, ...otherCollections, ...blackChipCollections];
};

export const sortAssets = (assets: any[]) => {
  const blueChipAssets = assets
    .filter((item) => isBlueChip(item.collection.slug))
    .sort((a, b) => {
      return a.collection.slug.localeCompare(b.collection.slug);
    });

  const blackChipAssets = assets
    .filter((item) => isBlackChip(item.collection.slug))
    .sort((a, b) => {
      return a.collection.slug.localeCompare(b.collection.slug);
    });

  const otherAssets = assets
    .filter(
      (item) =>
        !isBlueChip(item.collection.slug) && !isBlackChip(item.collection.slug)
    )
    .sort((a, b) => {
      if (
        a.collection.safelist_request_status ===
        b.collection.safelist_request_status
      ) {
        return a.collection.slug.localeCompare(b.collection.slug);
      }
      return (
        SAFELIST_REQUEST_STATUSES.indexOf(
          b.collection.safelist_request_status
        ) -
        SAFELIST_REQUEST_STATUSES.indexOf(a.collection.safelist_request_status)
      );
    });

  return [...blueChipAssets, ...otherAssets, ...blackChipAssets];
};
