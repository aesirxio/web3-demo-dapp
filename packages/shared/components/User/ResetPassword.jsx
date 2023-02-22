import { Alert } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import logo_img from "@public/images/Logo.svg";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Toast from "@shared_components/Toast";
import { useState } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const ResetPassword = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please enter your new password"),
      passwordConfirmation: Yup.string()
        .required("Please confirm password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      const id = router.query.id;
      const activation = router.query.activation;
      const new_password = values.password;
      setLoading(true);

      const url = `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=processResetComplete&api=hal`;
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { id, new_password, activation } }),
      });

      const response = await result.json();
      if (response.result.success) {
        toast.success(<Toast status={true} message={"Change password successfully"} />);
        router.push("/auth/signin");
      } else {
        toast.error(
          <Toast
            status={false}
            message={"Something is wrong. Please try again later or contact us"}
          />
        );
      }
      setLoading(false);
    },
  });
  return (
    <>
      <NextSeo noindex={true} nofollow={true} />
      <div
        className="sign-in position-fixed start-0 top-0 bottom-0 end-0 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#f0f3fb" }}
      >
        <div className="text-primary">
          <div className="text-center mb-4">
            <Link href="/" passHref>
              <a>
                <Image
                  quality={100}
                  src={logo_img}
                  width={141}
                  height={36}
                  alt="logo image"
                ></Image>
              </a>
            </Link>
          </div>
          <form
            className="sign-in-form bg-white rounded-4"
            method="post"
            onSubmit={formik.handleSubmit}
          >
            <h3 className="font-robotoslab fs-9 text-center mb-4 lh-base">Create new password </h3>
            <p className="fs-10 mb-4 text-center">
              Please create a new password that you don&apos;t on any orther site
            </p>
            <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
            <label className="d-block mb-2">
              New Password<span className="text-danger ms-1">*</span>
            </label>
            <input
              className="form-control rounded-4 px-3 py-sm lh-lg"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <Alert className="mt-1 p-1" variant="warning">
                {formik.errors.password}
              </Alert>
            ) : null}
            <label className="d-block mb-2 mt-4">
              Confirm Password<span className="text-danger ms-1">*</span>
            </label>
            <input
              className="form-control rounded-4 px-3 py-sm lh-lg"
              name="passwordConfirmation"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirmation}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
              <Alert className="mt-1 p-1" variant="warning">
                {formik.errors.passwordConfirmation}
              </Alert>
            ) : null}
            <button
              type="submit"
              className="d-block w-100 btn btn-success rounded-4 px-4 py-2 lh-lg text-uppercase fw-bold font-opensans btn btn-success my-4"
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
                "Send request"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
