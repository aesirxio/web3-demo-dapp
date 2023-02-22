import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { useFormik } from "formik";
import Image from "next/image";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Link from "next/link";
import { Alert } from "react-bootstrap";
import { useRouter } from "next/router";

import logo_img from "@public/images/Logo.svg";
import Toast from "@shared_components/Toast";

const ForgotPassword = ({ props }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Please enter your email"),
    }),
    onSubmit: async (values, actions) => {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=processResetRequest&api=hal`;
      const rs = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: values }),
      });

      let response = await rs.json();

      if (response.result.success) {
        toast.success(<Toast status={true} message={response._messages[0].message} />);
        actions.resetForm({ values: { email: "" } });
      } else {
        let message =
          response.result.content_id == "COM_USERS_INVALID_EMAIL"
            ? "Email does not exist !"
            : "Something is wrong. Please try again or contact us";
        toast.error(<Toast status={false} message={message} />);
      }
      setLoading(false);
    },
  });
  useEffect(() => {
    if (router.asPath.includes("outdate")) {
      toast.error(
        <Toast
          status={false}
          title="Warning !"
          message="Your password reset request has expired. Please resend another request!"
        />
      );
    }
    return () => {};
  }, [router.asPath]);

  return (
    <>
      <NextSeo
        title="AesirX | Reset your Password"
        noindex={true}
        nofollow={true}
        openGraph={{
          images: [
            {
              alt: "AesirX | Reset your Password",
              url: props?.SEO_image?.src,
            },
          ],
        }}
      />
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
            <h3 className="font-robotoslab fs-9 text-center mb-4 lh-base">Reset Password </h3>
            <p className="fs-10 mb-4 text-center">
              We&apos;ll email you instructions on how to reset your password
            </p>
            <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
            <label className="d-block mb-2">
              Email<span className="text-danger ms-1">*</span>
            </label>
            <input
              className="form-control rounded-4 px-3 py-sm lh-lg"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <Alert className="mt-1 p-1" variant="warning">
                {formik.errors.email}
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

export default ForgotPassword;
