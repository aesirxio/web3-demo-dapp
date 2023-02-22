import { Button as BSButton } from "react-bootstrap";

const ButtonComponent = ({ button, variant, children = null, loading, isNormalText = false }) => {
  const isBlank = button?.url?.charAt(0) !== "#";
  if (!children && !button?.url) {
    return null;
  }
  return children ? (
    <button
      className="d-block w-100 btn btn-success rounded-4 px-4 py-13px lh-sm text-uppercase fw-bold font-opensans btn btn-success mb-4"
      type="submit"
      disabled={loading}
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-1"
            role="status"
            aria-hidden="true"
          ></span>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  ) : (
    <BSButton
      className={`rounded-4 px-30px py-13px lh-sm ${
        isNormalText ? "fw-semibold" : "text-uppercase fw-bold"
      } font-opensans`}
      variant={variant ?? "success"}
      href={button?.url}
      target={!isBlank ? "" : "_blank"}
    >
      {button?.title && button?.title}
    </BSButton>
  );
};
export default ButtonComponent;
