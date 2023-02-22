import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Link from "next/link";
import Toast from "@shared_components/Toast";
import { Alert } from "react-bootstrap";
import Button from "@shared_components/Button";
import { createMember } from "@utils/Member";

const RegisterForm = ({ setShow }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      organisation: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
      organisation: Yup.string().required("Please enter your Company name"),
    }),
    onSubmit: async (values, actions) => {
      const { username, password, email, organisation } = values;

      setLoading(true);

      const member = {
        username: username ?? email,
        password: password ?? Math.random().toString(36).slice(2),
        organisation: organisation ?? "",
        email: email,
      };

      const memberRs = await createMember(member);
      const rsData = memberRs?.result;
      if (rsData?.success) {
        if (setShow) {
          setShow(false);
        }
        toast.success(
          <Toast
            status={true}
            title="Create user successfully !"
            message="We have sent you an email with the details to activate your account. Follow steps there to finish registration."
          />
        );
        actions.resetForm({
          values: {
            organisation: "",
            email: "",
            password: "",
          },
        });
      } else {
        let message =
          rsData.content_id == "error_organization_already_existed"
            ? "Company name already existed !"
            : rsData.content_id == "duplicated_username"
            ? "Email already existed !"
            : "";
        toast.error(<Toast status={false} message={message} />);
      }

      setLoading(false);
    },
  });
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="text-primary">
        <form method="post" onSubmit={formik.handleSubmit}>
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
            <Alert className="p-1" variant="warning">
              {formik.errors.password}
            </Alert>
          ) : null}
          <label className="d-block mb-2 mt-4">
            Company name<span className="text-danger ms-1">*</span>
          </label>
          <input
            className="form-control rounded-4 px-3 py-sm lh-lg"
            name="organisation"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.organisation}
          />
          {formik.touched.organisation && formik.errors.organisation ? (
            <Alert className="p-1" variant="warning">
              {formik.errors.organisation}
            </Alert>
          ) : null}
          <div className="form-check mb-4 mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="check-register"
              required
            />
            <label className="form-check-label" htmlFor="check-register">
              You agree to our{" "}
              <a href="/terms-conditions" target="_blank" className="fw-bold text-decoration-none">
                terms of service
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" target="_blank" className="fw-bold text-decoration-none">
                privacy policy.
              </a>
            </label>
          </div>
          <Button loading={loading}>Submit</Button>
          <div className="text-center">
            <Link href="/auth/signin" passHref>
              <a className="mb-0 fw-semibold">Already have an account? Log in</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
