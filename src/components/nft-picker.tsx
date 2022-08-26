import { Asset } from "models/asset";
import { useApi } from "services/api";
import AssetPreview from "components/asset-preview";

import styles from "./external-image.module.css";

const NFTPicker = ({ address }: { address: string }) => {
  const { data } = useApi<{ assets: Asset[] }>(`${address}/assets/`);

  const assets = !data ? [] : data.assets;

  return (
    <div className={styles.assetsContainer}>
      {assets.map((asset) => (
        <div key={asset.id} className={styles.asset} onClick={() => {}}>
          <AssetPreview asset={asset} />
        </div>
      ))}
    </div>
  );
};

export default NFTPicker;
