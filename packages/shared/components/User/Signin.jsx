import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import { NextSeo } from "next-seo";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { login } from "@utils/Authentication";
import logo_img from "@public/images/Logo.svg";
import { useAuthentication } from "@shared_auth/AuthenticationProvider";

const Toast = dynamic(() => import("@shared_components/Toast"));
const Button = dynamic(() => import("@shared_components/Button"));

const Signin = ({ props }) => {
  const [loading, setLoading] = useState(false);
  const { updateUserData, redirectProfile } = useAuthentication();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().email("Invalid email address").required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await login(values.username, values.password);
      if (response.error) {
        toast.error(<Toast status={false} message={response.error_description} />);
      } else {
        await updateUserData(response.access_token);
        redirectProfile(response.access_token);
      }
      setLoading(false);
    },
  });

  return (
    <>
      <NextSeo
        title="AesirX | Signin"
        noindex={true}
        nofollow={true}
        openGraph={{
          images: [
            {
              alt: "AesirX | Signin",
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
          <form onSubmit={formik.handleSubmit} className="sign-in-form bg-white rounded-4">
            <h3 className="font-robotoslab fs-9 text-center mb-4 lh-base">Sign in</h3>
            <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
            <label className="d-block mb-2">
              Email<span className="text-danger ms-1">*</span>
            </label>
            <input
              className="form-control rounded-4 px-3 py-sm lh-lg"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <Alert className="mt-1 p-1" variant="warning">
                {formik.errors.username}
              </Alert>
            ) : null}
            <label className="d-block mb-2 mt-4">
              Password<span className="text-danger ms-1">*</span>
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
            <div className="text-end mb-4 mt-4">
              <Link href="/auth/forgotpassword" passHref>
                <a>Forgot Password?</a>
              </Link>
            </div>
            <Button loading={loading}>Sign in</Button>

            <div className="text-center">
              <Link href="/auth/register" passHref>
                <a className="mb-0 fw-semibold">Don&apos;t have an account? Create Free Account</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
