import BackgroundImage from "@shared_components/BackgroundImage";
import { sliceText } from "@utils/FormatContent";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const BackgroundComponent = ({
  data,
  columnSize = 7,
  sliceTitle = false,
  minHeight = "500px",
  children = null,
  bgPosition,
  rowClasses,
  idName,
}) => {
  if (!data?.id && !children) {
    return null;
  }
  return (
    <div className="position-relative" id={idName ? idName : ""}>
      <BackgroundImage src={data?.item_bgimg?.src} objectPosition={bgPosition} />
      <Container className="position-relative z-1">
        <Row className={`${rowClasses} align-items-center`} style={{ minHeight: minHeight }}>
          <Col lg={columnSize}>
            {children ? (
              children
            ) : (
              <>
                <h1 className="text-white fs-1 fw-medium lh-sm mb-0">
                  {sliceText(data?.item_title, sliceTitle)}
                </h1>
                {data?.item_button?.[0]?.url && (
                  <Button
                    variant="success"
                    className="mt-40px py-13px px-30px fw-bold text-uppercase rounded-4 lh-sm"
                    href={data?.item_button?.[0]?.url}
                    target="_blank"
                  >
                    {data?.item_button?.[0]?.title}
                  </Button>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BackgroundComponent;
