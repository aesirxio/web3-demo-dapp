import Link from "next/link";
import { Row, Col, Container } from "react-bootstrap";
import bg_404 from "@public/images/bg_404.jpg";
import dynamic from "next/dynamic";
import useTrans from "@hook/useTrans";
import en from "@shared_lang/en";
import vi from "@shared_lang/vi";

const BackgroundImage = dynamic(() => import("@shared_components/BackgroundImage"));

const Page404 = () => {
  const trans = useTrans(en, vi);
  return (
    <div className="error-page position-fixed start-0 end-0 top-0 bottom-0 ">
      <BackgroundImage src={bg_404} alt="Background 404 page" />
      <Container className="position-relative z-1" style={{ paddingTop: "12rem" }}>
        <Row className="align-items-center text-white">
          <Col className="error-page-content" lg={{ span: 6, offset: 6 }}>
            <h1 className="fw-bold text-white" style={{ fontSize: "120px" }}>
              {trans.page_404.txt_oops}
            </h1>
            <p className="font-robotoslab fw-bold fs-1 text-uppercase">
              {trans.page_404.txt_not_found}
            </p>
            <p className="fw-semibold fs-8">{trans.page_404.txt_page_removed}</p>
            <Link href="/" passHref>
              <button className="px-2 px-md-4 rounded-4 py-2 lh-lg text-uppercase font-opensans fw-bold btn btn-success fs-6">
                {trans.page_404.txt_back_home}
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Page404;
