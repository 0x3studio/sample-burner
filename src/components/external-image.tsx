import Image from "next/image";

import styles from "./external-image.module.css";

declare type ImgElementStyle = NonNullable<
  JSX.IntrinsicElements["img"]["style"]
>;

const ExternalImage = ({
  src,
  alt,
  objectFit = "contain",
}: {
  src: string;
  alt: string;
  objectFit?: ImgElementStyle["objectFit"];
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit={objectFit}
      className={styles.image}
      onError={({ currentTarget }) => {
        currentTarget.src = "/img/transparent.png";
      }}
    />
  );
};

export default ExternalImage;
