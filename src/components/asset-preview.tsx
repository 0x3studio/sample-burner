import ExternalImage from "components/external-image";
import { Asset } from "models/asset";

import styles from "./asset-preview.module.css";

const AssetPreview = ({ asset }: { asset: Asset }) => {
  return (
    <div
      className={styles.assetPreview}
      style={
        asset.backgroundColor
          ? { backgroundColor: `#${asset.backgroundColor}` }
          : {}
      }
    >
      {asset.animationUrl ? (
        <video
          loop
          muted
          playsInline
          preload="auto"
          poster={asset.imageUrl}
          onMouseEnter={(e) => {
            e.currentTarget.play();
          }}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
          }}
        >
          <source src={asset.animationUrl} />
          {asset.name}
        </video>
      ) : (
        <>
          {asset.imageUrl ? (
            <ExternalImage
              src={asset.imageUrl}
              alt={asset.name}
              objectFit="cover"
            />
          ) : (
            <span />
          )}
        </>
      )}
    </div>
  );
};

export default AssetPreview;
