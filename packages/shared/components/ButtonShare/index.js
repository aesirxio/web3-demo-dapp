import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
function ButtonShare({ isChangeTwToTe }) {
  return (
    <>
      <div className="mb-3 pb-3">
        <button
          type="button"
          className="d-inline-flex justify-content-center align-items-center rounded-circle icon border-0 facebook"
          onClick={shareButtonHandlerFb}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#3b5998",
            color: "#ffffff",
          }}
        >
          <FontAwesomeIcon width={16} height={16} icon={faFacebookF} />
        </button>
        <button
          type="button"
          href="#"
          className="d-inline-flex justify-content-center align-items-center rounded-circle icon mx-3 border-0 twitter"
          onClick={isChangeTwToTe ? shareButtonHandlerTe : shareButtonHandlertw}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#00acee",
            color: "#ffffff",
          }}
        >
          <FontAwesomeIcon
            width={16}
            height={16}
            icon={isChangeTwToTe ? faPaperPlane : faTwitter}
          />
        </button>
        <button
          type="button"
          href="#"
          className="d-inline-flex justify-content-center align-items-center rounded-circle icon border-0 linkedin"
          onClick={shareButtonHandlerin}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#0e76a8",
            color: "#ffffff",
          }}
        >
          <FontAwesomeIcon width={16} height={16} icon={faLinkedinIn} />
        </button>
      </div>
    </>
  );
}
let pageUrl = encodeURIComponent(typeof document !== "undefined" && document.URL);
let url = null;
const shareButtonHandlerFb = (e) => {
  url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
  socialWindow(url, 570, 570);
};
const shareButtonHandlertw = (e) => {
  url = "https://twitter.com/intent/tweet?url=" + pageUrl;
  socialWindow(url, 570, 570);
};
const shareButtonHandlerin = (e) => {
  url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
  socialWindow(url, 570, 570);
};
const shareButtonHandlerTe = (e) => {
  url = "https://telegram.me/share/url?url=" + pageUrl;
  socialWindow(url, 570, 570);
};

function socialWindow(url, width, height) {
  var left = (screen.width - width) / 2;
  var top = (screen.height - height) / 2;
  var params =
    "menubar=no,toolbar=no,status=no,width=" +
    width +
    ",height=" +
    height +
    ",top=" +
    top +
    ",left=" +
    left;
  window.open(url, "", params);
}
export default ButtonShare;
