import React from "react";
import Image from "next/image";

function BackgroundImage({
  src,
  alt = "Background Image",
  className,
  objectPosition = "50% 50%",
  opacity = 1,
  isPriority = false,
  objectFit = "cover",
}) {
  if (!src) {
    return null;
  }
  return (
    <div className={`position-absolute start-0 end-0 top-0 bottom-0 ${className ?? ""}`}>
      <Image
        priority={isPriority}
        objectPosition={objectPosition}
        src={src}
        layout="fill"
        objectFit={objectFit}
        alt={alt}
        quality={100}
        style={{ opacity: opacity }}
      />
    </div>
  );
}

export default BackgroundImage;
