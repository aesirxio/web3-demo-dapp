import Head from "next/head";

export default function HeadComponent({ isFolder }) {
  return (
    <Head>
      <script src="https://cdn.sellix.io/static/js/embed.js"></script>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${isFolder ? "/favicon" : ""}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${isFolder ? "/favicon" : ""}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${isFolder ? "/favicon" : ""}/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${isFolder ? "/favicon" : ""}/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${isFolder ? "/favicon" : ""}/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}
