import { DefaultSeo } from "next-seo";
import aesirx from "@public/images/aesirx_dma_homepage_open-source_digital_marketing_automation_solution.jpg";

export default function DefaultSeoComponent(props) {
  const {
    isProd,
    title,
    description,
    alt,
    asPath,
    SEO_image,
    siteName,
    SEO_title,
    noIndex,
    noFollow,
  } = props;

  const src = SEO_image ? SEO_image.src : aesirx.src;

  return (
    <DefaultSeo
      title={title}
      description={description}
      // dangerouslySetAllPagesToNoIndex={!isProd || process.env.NEXT_PUBLIC_PADDLE_SANDBOX}
      // dangerouslySetAllPagesToNoFollow={!isProd || process.env.NEXT_PUBLIC_PADDLE_SANDBOX}
      dangerouslySetAllPagesToNoIndex={noIndex}
      dangerouslySetAllPagesToNoFollow={noFollow}
      openGraph={{
        type: "website",
        locale: "en_IE",
        url: process.env.NEXTAUTH_URL && `${process.env.NEXTAUTH_URL}${asPath}`,
        site_name: siteName ?? "AesirX",
        images: [
          {
            title: SEO_title ?? title,
            url: process.env.NEXTAUTH_URL && src,
            alt: alt,
            width: 1200,
            height: 630,
          },
        ],
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  );
}
