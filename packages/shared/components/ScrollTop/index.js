import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const ScrollTop = () => {
  let mybutton = null;
  useEffect(() => {
    if (typeof document !== "undefined") {
      mybutton = document.getElementById("btn-back-to-top");
      mybutton.style.display = "none";
      window.onscroll = function () {
        scrollFunction();
      };
    }
  }, []);
  function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  return (
    <div>
      <Button
        id="btn-back-to-top"
        style={{ width: "40px", height: "40px" }}
        className={`rounded-pill bottom-2rem end-2rem end-xxl-14rem text-center position-fixed p-0 z-4 bg-white text-success border`}
        variant="outline-success"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} width={16} height={16} />
      </Button>
    </div>
  );
};

export default ScrollTop;
