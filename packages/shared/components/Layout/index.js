import dynamic from "next/dynamic";

const PrivateNavbar = dynamic(() => import("@shared_components/Layout/PrivateNavbar"));
const Navbar = dynamic(() => import("@shared_components/Layout/Navbar"));
const Footer = dynamic(() => import("@shared_components/Layout/Footer"));
export default function Layout(props) {
  return (
    <>
      {props.children?.props?.hiddenLayout ? null : props.children?.props?.isPrivateRound ? (
        <PrivateNavbar />
      ) : (
        <Navbar
          menuHeaderLeft={props?.menuHeaderLeft}
          menuHeaderRight={props?.menuHeaderRight}
          listButton={props?.listButton}
          isSignin={props.isSignin}
          flexRowReverse={props?.flexRowReverse}
          pageProps={props?.pageProps}
          producthunt={props?.producthunt}
          showRankOnly={props?.showRankOnly}
          comming_soon={props?.comming_soon}
        />
      )}
      <main className={props.children?.props?.isPrivateRound ? "private-round" : ""}>
        {props.children}
      </main>
      {props.children?.props?.hiddenLayout ? null : (
        <Footer
          menuFooterLeft={props?.menuFooterLeft}
          menuFooterRight={props?.menuFooterRight}
          toolkitAcyMailing={props?.toolkitAcyMailing}
          link={props?.link}
          toolkitAcyMailingList={props?.toolkitAcyMailingList}
        />
      )}
    </>
  );
}
