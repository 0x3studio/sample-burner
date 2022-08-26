import type { NextApiRequest, NextApiResponse } from "next";

import { Asset } from "models/asset";
import { withAddressAndPage, withOpenSea } from "middlewares";
import {
  fetchUserAssetsByCollections,
  fetchAllUserCollections,
  ASSETS_PAGE_SIZE,
} from "services/opensea";
import { sortCollections, sortAssets } from "utils";

type Data = {
  error?: string;
  assets?: Asset[];
  totalAssets?: number | null;
  totalPages?: number | null;
};

export default withOpenSea(
  withAddressAndPage(
    async (
      req: NextApiRequest,
      res: NextApiResponse<Data>,
      address: string,
      page: number,
      openSeaApiKey: string
    ) => {
      const allCollections: any[] = await fetchAllUserCollections(
        openSeaApiKey,
        address
      );

      console.info(
        `(Collections API) fetched ${allCollections.length} collections for ${address}`
      );

      const sortedCollections = sortCollections(
        allCollections,
        ASSETS_PAGE_SIZE
      );
      const paginatedCollections: any[][] = [[]];
      let currentPage = 0;
      let currentPageAssets = 0;
      let totalAssets = 0;

      sortedCollections.forEach((collection) => {
        if (
          currentPageAssets + collection.owned_asset_count >
          ASSETS_PAGE_SIZE
        ) {
          paginatedCollections.push([]);
          currentPageAssets = 0;
          currentPage += 1;
        }
        paginatedCollections[currentPage].push(collection);
        currentPageAssets += collection.owned_asset_count;
        totalAssets += collection.owned_asset_count;
      });

      const totalPages = paginatedCollections.length;

      const rawAssets = paginatedCollections[page - 1]
        ? await fetchUserAssetsByCollections(
            openSeaApiKey,
            address,
            paginatedCollections[page - 1].map(
              (item) => item.primary_asset_contracts[0].address
            )
          )
        : [];

      const sortedRawAssets = sortAssets(rawAssets);

      const assets: Asset[] = sortedRawAssets.map((rawAsset: any) => ({
        id: `${rawAsset.asset_contract.address}/${rawAsset.token_id}`,
        name: rawAsset.name || `#${rawAsset.token_id}`,
        contractAddress: rawAsset.asset_contract.address,
        tokenId: rawAsset.token_id,
        url: `/assets/${rawAsset.asset_contract.address}/${rawAsset.token_id}`,
        externalUrl: rawAsset.permalink,
        imageUrl: rawAsset.image_url,
        animationUrl: rawAsset.animation_url,
        backgroundColor: rawAsset.background_color,
        collectionName: rawAsset.collection.name,
        collectionVerified:
          rawAsset.collection.safelist_request_status === "verified",
      }));

      res.status(200).json({ assets, totalAssets, totalPages });
    }
  )
);
