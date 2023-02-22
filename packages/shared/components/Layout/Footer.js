import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faGithub,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import logoImg from "@public/images/Logo.svg";
import x_icon from "@public/images/X_icon.png";
import useTrans from "@hook/useTrans";
import en from "@shared_lang/en";
import vi from "@shared_lang/vi";

export default function Footer({
  menuFooterLeft,
  menuFooterRight,

  link,
}) {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const trans = useTrans(en, vi);
  return (
    <>
      <Container ref={ref} className={inView ? "component component--zoom" : "component"}>
        <Row className="pt-58px pb-5rem">
          <Col xs={12} md={12} lg={8} xl={4} className="font-opensans fs-8">
            <div className="mb-3 mb-lg-0 text-lg-start">
              <strong className="fs-8">{`${trans.footer.txt_title}`}</strong>
              <br />
              <p className="fs-6 mb-0 lh-md">{`${trans.footer.txt_location1}`}</p>
              <p className="fs-6 mb-0 lh-md">{`${trans.footer.txt_location2}`}</p>
            </div>
            <div className="mt-4">
              <a
                title="Github"
                href={link ? link : "https://github.com/aesirxio/dma-app"}
                target="_blank"
                className="d-inline-flex justify-content-center align-items-center rounded-circle icon"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#272730",
                  color: "#ffffff",
                }}
              >
                <FontAwesomeIcon width={16} height={16} icon={faGithub} />
              </a>
              <a
                title="Facebook"
                href="https://www.facebook.com/aesirxio/"
                target="_blank"
                className="d-inline-flex justify-content-center align-items-center rounded-circle icon ms-2 ms-sm-3"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#272730",
                  color: "#ffffff",
                }}
              >
                <FontAwesomeIcon width={16} height={16} icon={faFacebookF} />
              </a>
              <a
                title="Twitter"
                href="https://twitter.com/aesirxio"
                target="_blank"
                className="d-inline-flex justify-content-center align-items-center rounded-circle icon ms-2 ms-sm-3"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#272730",
                  color: "#ffffff",
                }}
              >
                <FontAwesomeIcon width={16} height={16} icon={faTwitter} />
              </a>
              <a
                title="Telegram"
                href="https://t.me/aesirxio"
                target="_blank"
                className="d-inline-flex justify-content-center align-items-center rounded-circle icon ms-2 ms-sm-3"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#272730",
                  color: "#ffffff",
                }}
              >
                <FontAwesomeIcon width={14} height={14} icon={faPaperPlane} />
              </a>
              <a
                title="Linkedin"
                href="https://www.linkedin.com/company/aesirx"
                target="_blank"
                className="d-inline-flex justify-content-center align-items-center rounded-circle icon ms-2 ms-sm-3"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#272730",
                  color: "#ffffff",
                }}
              >
                <FontAwesomeIcon width={16} height={16} icon={faLinkedinIn} />
              </a>
              <a
                title="Instagram"
                href="https://www.instagram.com/aesirxio/"
                target="_blank"
                className="d-inline-flex justify-content-center align-items-center rounded-circle icon ms-2 ms-sm-3"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#272730",
                  color: "#ffffff",
                }}
              >
                <FontAwesomeIcon width={14} height={14} icon={faInstagram} />
              </a>
              <a
                title="Youtube"
                href="https://www.youtube.com/@aesirxio"
                target="_blank"
                className="d-inline-flex justify-content-center align-items-center rounded-circle icon ms-2 ms-sm-3"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#272730",
                  color: "#ffffff",
                }}
              >
                <FontAwesomeIcon width={14} height={14} icon={faYoutube} />
              </a>
              {/* <LanguageComponent /> */}
            </div>
          </Col>
          {menuFooterLeft && (
            <Col xs={6} lg={6} xl={2} className="font-opensans  ">
              {menuFooterLeft.map((item, index) => {
                return (
                  <div className="lh-base p-1" key={index}>
                    <Link href={item.href} passHref>
                      <a
                        target={item?.target}
                        rel={item?.target ? "noreferrer" : null}
                        className="text-decoration-none text-hover"
                        href={item.href}
                      >
                        {item.title}
                      </a>
                    </Link>
                  </div>
                );
              })}
            </Col>
          )}
          {menuFooterRight && (
            <Col xs={6} lg={6} xl={2} className="font-opensans ">
              {menuFooterRight.map((item, index) => {
                return (
                  <div className="lh-base p-1" key={index}>
                    <Link href={item.href} passHref>
                      <a
                        target={item?.target}
                        rel={item?.target ? "noreferrer" : null}
                        className="text-decoration-none text-hover"
                        href={item.href}
                      >
                        {item.title}
                      </a>
                    </Link>
                  </div>
                );
              })}
            </Col>
          )}
        </Row>
        <hr className="m-0 mt-0 mt-xl-0" />
        <Row id="footer" className="align-items-center pt-4 pb-2rem">
          <Col lg={8}>
            <div className="d-flex pl-2 font-opensans">
              <Image quality={100} src={logoImg} alt="Logo Image" width={139} height={34} />
              <div className="ms-13px fs-10 lh-sm">
                {`${trans.footer.txt_evolution} `}+
                <span style={{ verticalAlign: "sub" }}>
                  <Image
                    quality={100}
                    src={x_icon}
                    layout="intrinsic"
                    alt="icon"
                    width={18}
                    height={28}
                  />
                </span>{" "}
                {`${trans.footer.txt_norse}`}
                <br />
                <span className="fw-semibold text-italic">
                  <em>{`${trans.footer.txt_achieve_particular}`}</em>
                </span>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3 mb-md-0 text-lg-end font-opensans">{`${trans.footer.txt_copy_right}`}</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
