import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const TooltipCustom = ({ children, placement }) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={
        <Tooltip>
          <div className="fst-italic text-start ps-3 py-2">{children}</div>
        </Tooltip>
      }
    >
      <button className="btn rounded-pill p-0">
        <FontAwesomeIcon className="text-success" icon={faCircleInfo} width={13} height={13} />
      </button>
    </OverlayTrigger>
  );
};
export default TooltipCustom;
