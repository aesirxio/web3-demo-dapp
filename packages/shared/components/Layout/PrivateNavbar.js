import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import logoImg from "@public/images/Logo.svg";
import Image from "next/image";
import { Button, Container } from "react-bootstrap";

const PrivateNavbar = () => {
  const [show, setShow] = useState(false);
  const showIcon = useRef(null);
  useEffect(() => {
    document.querySelector("html").classList.add("private-scroll");
    return () => document.querySelector("html").classList.remove("private-scroll");
  }, []);
  return (
    <div
      className={`${
        show ? "h-100" : ""
      } menu private-menu position-fixed top-0 z-3 shadow-sm w-100 bg-white h-lg-unset`}
    >
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <Link href="https://aesirx.io/" passHref>
            <a>
              <Image quality={100} src={logoImg} width={108} height={28} alt="Logo" />
            </a>
          </Link>
          <div
            className={`menu-list ${
              show ? "position-absolute bg-white top-80px start-0 end-0" : "d-none "
            } d-lg-block position-lg-static`}
          >
            <nav className="navbar p-0 container">
              <ul className="navbar-nav flex-column flex-lg-row flex-xl-row flex-xxl-row mb-0 p-0 fs-10 w-100">
                <li className="nav-item text-end py-3 py-lg-0 position-relative">
                  <Link href={"/seed-round#about"} passHref>
                    <a
                      className={
                        "fs-10 fw-semibold px-3 px-xl-4 text-uppercase text-primary text-decoration-none"
                      }
                    >
                      WE ARE AESIRX
                    </a>
                  </Link>
                </li>
                <li className="nav-item text-end py-3 py-lg-0 border-top border-top-lg-0 position-relative">
                  <Link href={"/seed-round#web3"} passHref>
                    <a
                      className={
                        "fs-10 fw-semibold px-3 px-xl-4 text-uppercase text-primary text-decoration-none"
                      }
                    >
                      AesirX WEB3 ID
                    </a>
                  </Link>
                </li>
                <li className="nav-item text-end py-3 py-lg-0 border-top border-top-lg-0 position-relative">
                  <Link href={"/seed-round#testimonial"} passHref>
                    <a
                      className={
                        "fs-10 fw-semibold px-3 px-xl-4 text-uppercase text-primary text-decoration-none"
                      }
                    >
                      testimonial
                    </a>
                  </Link>
                </li>
                <li className="nav-item text-end py-3 py-lg-0 border-top border-top-lg-0 position-relative">
                  <Link href={"/tokenomics"} passHref>
                    <a
                      className={
                        "fs-10 fw-semibold px-3 px-xl-4 text-uppercase text-primary text-decoration-none"
                      }
                    >
                      Tokenomics
                    </a>
                  </Link>
                </li>
                <li className="nav-item text-end py-3 py-lg-0 border-top border-top-lg-0 position-relative">
                  <Link href={"#vesting"} passHref>
                    <a
                      className={
                        "fs-10 fw-semibold px-3 px-xl-4 text-uppercase text-primary text-decoration-none"
                      }
                    >
                      Vesting
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="d-flex align-items-center">
            <Link href={"/seed-round/#private-form"}>
            <Button
              // href={"/seed-round/#private-form"}
              variant="success"
              className="fw-semibold py-13px px-2 px-lg-4 lh-sm my-3"
            >
              Register interest
            </Button>
            </Link>
            <div
              ref={showIcon}
              onClick={() => setShow(!show)}
              className={
                (show ? "show h-0" : "") +
                " d-block d-lg-none mx-3 cursor-pointer hambuber-icon d-flex justify-content-around flex-column align-items-center"
              }
            >
              <div className="rounded-2 bg-success"></div>
              <div className="rounded-2 bg-success"></div>
              <div className="rounded-2 bg-success"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivateNavbar;
