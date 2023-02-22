import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { Container, Row, Col } from "react-bootstrap";
import LazyLoad from "react-lazyload";

const CreateMarkup = dynamic(() => import("@shared_components/CreateMarkup"));

const Brand = ({ data }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  return (
    <div
      id="list-brand"
      ref={ref}
      className={(inView ? "component--zoom" : "") + " component pb-4rem"}
    >
      <LazyLoad height={450}>
        <Container className="text-center">
          <p className="fs-10 fw-semibold text-secondary lh-base text-uppercase mb-18px ls-3">
            {data.title && data.title}
          </p>
          <h3 className="text-secondary fw-light font-robotoslab fs-9 mb-18px">
            {data.item_title && data.item_title}
          </h3>
          <CreateMarkup
            className="d-block lh-md mb-18px"
            htmlString={data.item_editor && data.item_editor}
          />
          <Row>
            {data.list_brand.decoded &&
              data.list_brand.decoded.map((brand, index) => {
                return (
                  <Col xs={6} lg={2} key={index}>
                    <div className="brand p-4 border mb-4 bg-gray-200 rounded-4">
                      {brand?.item_img?.src && (
                        <Image
                          quality={100}
                          objectFit="contain"
                          src={brand?.item_img?.src ?? ""}
                          width={120}
                          height={30}
                          alt="brand image"
                        />
                      )}
                    </div>
                  </Col>
                );
              })}
          </Row>
          {data.item_button && (
            <Link href="/channels" passHref>
              <button className="px-4 rounded-4 py-13px mt-18px lh-sm text-uppercase font-opensans fw-bold btn btn-success">
                {data?.item_button?.[0]?.title}
              </button>
            </Link>
          )}
        </Container>
      </LazyLoad>
    </div>
  );
};
export default Brand;
