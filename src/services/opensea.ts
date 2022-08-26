export class OpenSeaError extends Error {}

export enum AssetHolderCategory {
  USERS = "users",
  COLLECTIONS = "collections",
}

export const ASSETS_PAGE_SIZE = 50;
export const COLLECTIONS_PAGE_SIZE = 300;

export const fetchUserAssetsByCollections = async (
  openSeaApiKey: string,
  address: string,
  contractAddresses: string[]
) => {
  const contractAddressesParams = contractAddresses.join(
    "&asset_contract_addresses="
  );

  const response = await fetch(
    `https://api.opensea.io/api/v1/assets?owner=${address}&asset_contract_addresses=${contractAddressesParams}&offset=0&limit=${ASSETS_PAGE_SIZE}`,
    {
      headers: {
        Accept: "application/json",
        "X-API-KEY": openSeaApiKey,
      },
    }
  );

  if (!response.ok) {
    const responseText = await response.text();
    console.error(
      `(OpenSea service) encountered error while fetching assets for ${address}: ${responseText}`
    );
    throw new OpenSeaError(
      `Encountered error while fetching assets for ${address}: ${responseText}`
    );
  }

  return (await response.json()).assets;
};

export const fetchUserCollections = async (
  openSeaApiKey: string,
  address: string,
  offset: number = 0,
  limit: number = COLLECTIONS_PAGE_SIZE
) => {
  const response = await fetch(
    `https://api.opensea.io/api/v1/collections?asset_owner=${address}&offset=${offset}&limit=${limit}`,
    {
      headers: {
        Accept: "application/json",
        "X-API-KEY": openSeaApiKey,
      },
    }
  );

  if (!response.ok) {
    const responseText = await response.text();
    console.error(
      `(OpenSea service) encountered error while fetching collections for ${address}: ${responseText}`
    );
    throw new OpenSeaError(
      `Encountered error while fetching collections for ${address}: ${responseText}`
    );
  }

  return await response.json();
};

export const fetchAllUserCollections = async (
  openSeaApiKey: string,
  address: string
) => {
  let allCollections: any[] = [];
  let responseData: any[] = [];
  let offset = 0;

  responseData = await fetchUserCollections(
    openSeaApiKey,
    address,
    offset,
    COLLECTIONS_PAGE_SIZE
  );

  allCollections = [...allCollections, ...responseData];

  while (responseData.length === COLLECTIONS_PAGE_SIZE) {
    offset += COLLECTIONS_PAGE_SIZE;

    responseData = await fetchUserCollections(
      openSeaApiKey,
      address,
      offset,
      COLLECTIONS_PAGE_SIZE
    );

    allCollections = [...allCollections, ...responseData];
  }

  return allCollections;
};
