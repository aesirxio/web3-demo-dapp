import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import dma_image from "@public/images/aesirx_dma_homepage_open-source_digital_marketing_automation_solution.jpg";
import { useAuthentication } from "@shared_auth/AuthenticationProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

export default function ListComponent() {
  const { accountAddress, provider } = useAuthentication();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (accountAddress) {
          const nonce = (
            await axios.get(
              `${process.env.NEXT_PUBLIC_ENDPOINT}/account/v1/${accountAddress}/nonce`
            )
          ).data.nonce;

          const signedNonce = Buffer.from(
            JSON.stringify(await provider.signMessage(accountAddress, String(nonce))),
            "utf-8"
          ).toString("base64");

          const products = await axios.get(
            `${process.env.NEXT_PUBLIC_ENDPOINT}/product/v1/${accountAddress}?signature=${signedNonce}`
          );

          setProducts(products?.data);
        }
      } catch (error) {}
    })();
  }, [accountAddress, provider]);

  return (
    <div className="container sso-demo py-5">
      <h1>My Products</h1>
      <Row className="mt-3 gx-30px">
        {products.length > 0 ? (
          products.map((product, key) => {
            return (
              <Col key={key} className="mb-40px" md={6} lg={4}>
                <div className="blog-item">
                  <div className="blog-item-image">
                    <a>
                      <Image
                        quality={100}
                        className="rounded-top-4"
                        objectFit="cover"
                        src={`${process.env.NEXT_PUBLIC_ENDPOINT}/api/${product.main_image}`}
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
                          title={product.name}
                          className="fs-8 lh-base mb-0 fw-semibold font-opensans line-limit lm-2 mb-2rem"
                        >
                          {product.name}
                        </h3>
                        <p>SKU: {product.sku}</p>

                        <p>Token: {product.token}</p>
                        <p>Block: ...{product.block.substring(accountAddress.length - 6)} </p>
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
