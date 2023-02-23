import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import dma_image from "@public/images/aesirx_dma_homepage_open-source_digital_marketing_automation_solution.jpg";

export default function ListComponent() {
  let productList = [
    {
      name: "Aesirx DMA",
      sku: "001",
    },
    {
      name: "Aesirx DAM",
      sku: "002",
    },
    {
      name: "Aesirx PIM",
      sku: "003",
    },
    {
      name: "Aesirx BI",
      sku: "004",
    },
    {
      name: "Aesirx Analytics",
      sku: "005",
    },
    {
      name: "Aesirx SSO",
      sku: "006",
    },
    {
      name: "Aesirx MCMS",
      sku: "007",
    },
    {
      name: "Aesirx Content",
      sku: "008",
    },
  ];

  return (
    <div className="container sso-demo py-5">
      <h1>My Products</h1>
      <Row className="mt-3 gx-30px">
        {productList.length ? (
          productList.map((item, key) => {
            return (
              <Col key={key} className="mb-40px" md={6} lg={4}>
                <div className="blog-item">
                  <div className="blog-item-image">
                    <a>
                      <Image
                        quality={100}
                        className="rounded-top-4"
                        objectFit="cover"
                        src={dma_image}
                        width={402}
                        height={227}
                        alt="blog image"
                      />
                    </a>
                  </div>
                  <div className="blog-item-content shadow-1 rounded-bottom-4 bg-white">
                    <div className="d-flex flex-column justify-content-between content-item p-4 pb-2rem">
                      <div className="blog-item-title text-decoration-none">
                        <h3
                          title={item.name}
                          className="fs-8 lh-base mb-0 fw-semibold font-opensans line-limit lm-2 mb-2rem"
                        >
                          {item.name}
                        </h3>
                        <p>SKU: </p>
                        <p>Name: </p>
                        <p>Token: </p>
                        <p>Block: </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div className="text-decoration-none text-success d-flex align-items-center fs-10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })
        ) : (
          <Col sm="12" className="mt-4">
            No products
          </Col>
        )}
      </Row>
    </div>
  );
}
