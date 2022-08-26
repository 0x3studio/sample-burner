export interface Asset {
  id: string;
  name: string;
  contractAddress?: string;
  tokenId?: string;
  url?: string;
  externalUrl?: string;
  imageUrl?: string;
  animationUrl?: string;
  backgroundColor?: string;
  collectionName?: string;
  collectionVerified?: boolean;
}
