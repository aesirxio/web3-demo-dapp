import React from "react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import { getBreadCrumbs } from "@utils/FormatContent";
import Link from "next/link";
import ChevronIcon from "./ChevronRightIcon";

function Breadcrumb({ currentUrl, isBlogHome = false }) {
  const { asPath } = useRouter();
  const listBreadcrumbs = getBreadCrumbs(asPath, isBlogHome);
  return (
    <div className="border-bottom">
      <Container>
        <div className="d-flex align-items-center text-primary py-18px text-capitalize">
          {listBreadcrumbs &&
            listBreadcrumbs.map((item, index) => {
              if (index == listBreadcrumbs.length - 1) {
                return (
                  <span key={index} className="text-success line-limit lm-1">
                    {currentUrl ?? item.title}
                  </span>
                );
              } else {
                return (
                  <div key={index} className="d-flex align-items-center">
                    <Link href={item?.href}>
                      <a className={` text-decoration-none ws-nowrap`}>{item.title}</a>
                    </Link>
                    <ChevronIcon className={"mx-13px"} />
                  </div>
                );
              }
            })}
        </div>
      </Container>
    </div>
  );
}

export default Breadcrumb;
