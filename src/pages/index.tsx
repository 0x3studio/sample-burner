import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import type { NextPage } from "next";
import Head from "next/head";

import AssetPicker from "components/asset-picker";
import AssetPreview from "components/asset-preview";

import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [visibleAssetPicker, setVisibleAssetPicker] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const { address } = useAccount();

  useEffect(() => {
    setIsConnected(!!address);
  }, [address]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Burner 🔥</title>
        <meta
          name="description"
          content="Kill this nasty NFT with fire now!!!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ConnectButton showBalance={false} chainStatus="none" />
        <h1>Burner</h1>
        <h2>by 0x3 Studio</h2>
        {isConnected && (
          <>
            {selectedAsset ? (
              <>
                <p>You have selected an asset.</p>
                <AssetPreview asset={selectedAsset} />
                <button onClick={() => {}}>Confirm</button>
                <button
                  onClick={() => {
                    setSelectedAsset(null);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setVisibleAssetPicker(true);
                  }}
                >
                  Select an NFT to burn
                </button>
                {address && visibleAssetPicker && (
                  <AssetPicker
                    address={address}
                    onSelectItem={(asset: any) => setSelectedAsset(asset)}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <a href="https://0x3.studio" target="_blank" rel="noopener noreferrer">
          Made in 🇧🇪 by 0x3 Studio
        </a>
      </footer>
    </div>
  );
};

export default Home;
