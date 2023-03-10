import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import logoImg from "@public/images/Logo.svg";
import SubMenu from "../Header/SubMenu";

import useTrans from "@hook/useTrans";
import en from "@shared_lang/en";
import vi from "@shared_lang/vi";

const User = dynamic(() => import("@shared_components/User"));

export default function Navbar({
  menuHeaderLeft,
  menuHeaderRight,
  isSignin = true,
  listButton = [],
  producthunt,
  comming_soon,
  flexRowReverse,
}) {
  const trans = useTrans(en, vi);
  const showIcon = useRef(null);
  const collapseRef = useRef(null);
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) return;
    function handleClick(event) {
      if (showIcon.current && !showIcon.current.contains(event.target)) {
        if (!(collapseRef.current !== null && collapseRef?.current?.contains(event.target))) {
          setShow(false);
        }
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [show]);
  if (typeof document !== "undefined") {
    if (show) {
      document
        .getElementById("menu")
        ?.parentElement?.parentElement?.classList.add("overflow-hidden");
      document.getElementById("btn-back-to-top")?.classList.remove("z-4");
      document.getElementById("btn-back-to-top")?.classList.add("z-1");
    } else {
      document
        .getElementById("menu")
        ?.parentElement?.parentElement?.classList.remove("overflow-hidden");
      document.getElementById("btn-back-to-top")?.classList.add("z-4");
    }
  }

  return (
    <div
      className={`menu position-fixed top-0 start-0 end-0 bg-white z-3 shadow-sm ${
        show ? "h-100 h-lg-unset overflow-x-hidden overflow-y-scroll" : "h-unset"
      } ${producthunt && show ? "pb-4rem" : ""}`}
      id="menu"
    >
      <div className="container">
        <div className="menu-top d-flex justify-content-between py-13px align-items-center border-0 border-lg-bottom">
          <div className="menu-logo">
            <Link href="https://aesirx.io/" passHref>
              <a>
                <Image quality={100} src={logoImg} width={108} height={28} alt="Logo" />
              </a>
            </Link>
          </div>
          <div className="menu-button d-flex align-items-center align-items-lg-start">
            {listButton?.length != 0 &&
              listButton.map((item, index) => {
                if (item.target) {
                  return (
                    <a
                      key={index}
                      rel="noreferrer"
                      target="_blank"
                      href={item.href}
                      className={`px-1 ms-2 ms-lg-3 d-none d-lg-block px-md-4 rounded-4 py-2 text-uppercase font-opensans fw-bold btn ${
                        item.colorbtn
                          ? item.colorbtn
                          : index % 2 !== 0
                          ? "btn-outline-success"
                          : "btn-success"
                      } fs-10 ${comming_soon && "position-relative pe-none"}`}
                    >
                      {comming_soon && (
                        <span className="position-absolute bottom-0 fs-10px start-50 translate-middle-x text-lowercase text-truncate">
                          {trans.text_btn.txt_comingsoon}
                        </span>
                      )}
                      {item.title}
                    </a>
                  );
                }
                return (
                  <Link href={item.href} key={index}>
                    <button
                      className={`px-2 d-none d-lg-block px-md-4 rounded-4 py-2 text-uppercase font-opensans fw-bold btn ${
                        index % 2 !== 0 ? "btn-outline-success" : "btn-success"
                      } ms-2 ms-lg-3 fs-10`}
                    >
                      {item.title}
                    </button>
                  </Link>
                );
              })}
            {isSignin && <User />}
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
        {menuHeaderLeft && (
          <div
            className={
              (show ? "" : "d-none") +
              " menu-bottom d-lg-flex justify-content-between align-items-center position-relative border-top-0 border-top-lg" +
              (!flexRowReverse ? " flex-row-reverse" : "")
            }
          >
            <div className="menu-list ">
              <nav className="navbar p-0">
                <ul className="navbar-nav flex-column flex-lg-row flex-xl-row flex-xxl-row mb-0 p-0 fs-10 w-100">
                  {menuHeaderLeft.map((item, index) => {
                    return (
                      <li key={index} className="nav-item position-relative">
                        <Link href={item.href} passHref>
                          <a
                            target={item.target ?? null}
                            rel={item.target ? "noopener noreferrer" : null}
                            className={
                              (index !== 0
                                ? "ms-lg-3 ms-xl-4 ms-xxl-5 border-top border-lg-0 "
                                : "") +
                              (item.slug === "/" && router.pathname === "/"
                                ? "active "
                                : router.asPath.includes(item.slug) && item.slug !== "/"
                                ? "active "
                                : "") +
                              (item.hasSub && " pe-30px ") +
                              " nav-link position-relative py-3 py-lg-22px text-uppercase fw-semibold ws-nowrap"
                            }
                          >
                            {item.title}
                          </a>
                        </Link>
                        {item.hasSub && <SubMenu iconRef={collapseRef} subMenu={item.hasSub} />}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            {menuHeaderRight && (
              <div className=" fw-semibold fs-10 text-uppercase text-sm-start border-top border-lg-0 py-3 py-lg-22px ">
                {menuHeaderRight.map((item, index) => {
                  return (
                    <Link href={item.href} passHref key={index}>
                      <a
                        href={item.href}
                        key={index}
                        target={item.target ?? null}
                        rel={item.target ? "noopener noreferrer" : null}
                        className="text-decoration-none ws-nowrap "
                      >
                        {item.title}
                      </a>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
