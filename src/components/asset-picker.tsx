import { Asset } from "models/asset";
import { useApi } from "services/api";
import AssetPreview from "components/asset-preview";

import styles from "./asset-picker.module.css";

const AssetPicker = ({
  address,
  onSelectItem,
}: {
  address: string;
  onSelectItem: any;
}) => {
  const { data } = useApi<{ assets: Asset[] }>(`${address}/assets/`);

  const assets = !data ? [] : data.assets;

  return (
    <div className={styles.container}>
      {assets.map((asset) => (
        <div
          key={asset.id}
          className={styles.item}
          onClick={() => {
            onSelectItem(asset);
          }}
        >
          <AssetPreview asset={asset} />
        </div>
      ))}
    </div>
  );
};

export default AssetPicker;
