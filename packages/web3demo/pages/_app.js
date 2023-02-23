import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "@styles/App.scss";
import "@styles/_custom.scss";

import useTrans from "@hook/useTrans";
import en from "@lang/en";
import vi from "@lang/vi";

const Layout = dynamic(() => import("@shared_components/Layout"));
const ProgressBar = dynamic(() => import("@shared_components/ProgessBar"), { ssr: false });
const HeadComponent = dynamic(() => import("@shared_components/Head"));
const DefaultSeoComponent = dynamic(() => import("@shared_components/DefaultSeo"));
const ScrollTop = dynamic(() => import("@shared_components/ScrollTop"));
const AuthComponent = dynamic(() => import("@shared_components/AuthComponent"));

import SEO_image from "@public/images/og.jpg";

function SafeHydrate({ children }) {
  return <div suppressHydrationWarning>{typeof window === "undefined" ? null : children}</div>;
}

function MyApp({ Component, pageProps: { ...pageProps } }) {
  const trans = useTrans(en, vi);

  const { asPath } = useRouter();
  const isProd = process.env.NODE_ENV === "production";

  return (
    <>
      <HeadComponent />
      <DefaultSeoComponent
        isProd={isProd}
        title={trans.home.txt_title_home}
        alt={trans.home.txt_title_home}
        asPath={asPath}
        noIndex={true}
        noFollow={true}
        SEO_image={SEO_image}
      />

      <ProgressBar />
      <AuthComponent>
        <Layout pageProps={pageProps?.items} isSignin={true}>
          <SafeHydrate>
            <Component {...pageProps} />
          </SafeHydrate>
        </Layout>
      </AuthComponent>
      <ScrollTop />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 100000 }}
      />
    </>
  );
}

export default MyApp;
