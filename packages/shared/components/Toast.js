import Image from "next/image";

import success_img from "@public/images/toast_success.png";
import danger_img from "@public/images/toast_danger.png";

const Toast = (props) => {
  return (
    <div
      className="toast-popup d-flex align-items-center"
      style={props.status ? { color: "#047857" } : { color: "#B91C1C" }}
    >
      <div className="toast-popup-image">
        <Image
          quality={100}
          src={props.status ? success_img : danger_img}
          width={55}
          height={55}
          alt="toast img"
        />
      </div>
      <div className="fs-10 ms-3">
        <p className="mb-1">{props.title ? props.title : props.status ? "Success!" : "Fail!"}</p>
        <p className="mb-0">{props.message}</p>
      </div>
    </div>
  );
};
export default Toast;
