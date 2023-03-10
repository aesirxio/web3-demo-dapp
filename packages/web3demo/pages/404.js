import dynamic from "next/dynamic";
const Page404 = dynamic(() => import("@shared_components/Page404"));

const Custom404 = () => {
  return <Page404 />;
};

Custom404.defaultProps = {
  hiddenLayout: true,
};
export default Custom404;
