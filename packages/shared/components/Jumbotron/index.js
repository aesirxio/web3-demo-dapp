import { Container, Row } from "react-bootstrap";
import Image from "next/image";

const Jumbotron = (props) => {
  return (
    <div
      className={
        props.mask ? `${props.mask}` + " mask position-relative h-100" : "position-relative h-100"
      }
      style={{
        backgroundColor: props.bgColor ? props.bgColor : "transparent",
      }}
    >
      {props.image ? (
        <Image
          quality={100}
          className={props.position ? `op-${props.position}` : ""}
          priority={props.priority ?? false}
          layout="fill"
          objectFit="cover"
          src={props.image}
          alt={props.alt}
        />
      ) : (
        ""
      )}
      {props?.fullWidth ? (
        <div className="component component--zoom position-relative z-1 ">
          <Row
            style={{
              paddingTop: props.PaddingY,
              paddingBottom: props.PaddingY,
              minHeight: props?.minHeight,
            }}
            className={props.classRow + " align-items-center"}
          >
            {props.children}
          </Row>
        </div>
      ) : (
        <Container className="component component--zoom position-relative z-1 ">
          <Row
            style={{
              paddingTop: props.PaddingY,
              paddingBottom: props.PaddingY,
              minHeight: props?.minHeight,
            }}
            className={props.classRow + " align-items-center"}
          >
            {props.children}
          </Row>
        </Container>
      )}
    </div>
  );
};

Jumbotron.defaultProps = {
  PaddingY: "5rem",
};

export default Jumbotron;
