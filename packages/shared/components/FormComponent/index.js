import { Button, Col, Form, Row } from "react-bootstrap";
import Input from "@shared_components/Utils/Input";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import Toast from "@shared_components/Toast";
import * as Yup from "yup";
import FormData from "form-data";
import axios from "axios";
import FriendlyCaptcha from "@shared_components/FriendlyCaptcha";
import CreateMarkup from "@shared_components/CreateMarkup";

function FormComponent({ data = [], formID, listCol = [], setStatus, inputClass, labelClass }) {
  if (!data?.length) {
    return null;
  }

  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [fieldFile, setFieldFile] = useState({});

  const generateInitialValue = (data) => {
    let initialValue = {};
    data?.forEach((item) => {
      if (item.fieldtype == "email") {
        initialValue[`field${item.fieldId}_1_email`] = "";
      } else {
        initialValue[`field${item.fieldId}_1`] = "";
      }
    });
    return initialValue;
  };
  const generateValidationSchema = (data) => {
    let validationSchema = {};
    data?.forEach((item) => {
      if (item.required == "1") {
        switch (item.fieldtype) {
          case "email":
            validationSchema[`field${item.fieldId}_1_email`] = Yup.string()
              .email(`Please enter valid email`)
              .required(`Please enter your ${item.name}`);
            break;
          case "username":
            validationSchema[`field${item.fieldId}_1`] = Yup.string()
              .min(3, `Your ${item.name} is too short`)
              .max(30, `Your ${item.name} is too long`)
              .required(`Please enter your ${item.name}`);
            break;
          case "select":
            validationSchema[`field${item.fieldId}_1`] = Yup.string().required(
              `Please select ${item.name}`
            );
            break;

          default:
            validationSchema[`field${item.fieldId}_1`] = Yup.string().required(
              `Please enter your ${item.name}`
            );
            break;
        }
      }
    });
    return validationSchema;
  };
  const formatData = (data) => {
    data.captcha = captcha;
    delete data[fieldFile?.fieldName];
    delete data["fieldName"];
    data.form_id = formID;
  };
  const formik = useFormik({
    initialValues: generateInitialValue(data),
    validationSchema: Yup.object(generateValidationSchema(data)),
    onSubmit: async (values, { resetForm }) => {
      let data = { ...values };
      formatData(data);
      const formData = new FormData();
      const dataRedForm = data;
      let newKeyMail = "";
      for (const [key] of Object.entries(dataRedForm)) {
        if (key.includes("email")) {
          newKeyMail = key.replace("_email", "[email]");
          dataRedForm[newKeyMail] = dataRedForm[key];
          delete dataRedForm[key];
        }
      }

      for (const key in dataRedForm) {
        formData.append(key, dataRedForm[key]);
      }
      if (fieldFile?.fileData) {
        formData.append(fieldFile?.fieldName, fieldFile?.fileData);
      }
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?option=com_redform&task=redform.save&format=json`,
        formData
      );
      if (response) {
        setLoading(false);
        if (setStatus) {
          setStatus(true);
        }
        toast.success(
          <Toast
            status={true}
            message={
              response.status === 200 ? <CreateMarkup htmlString={response?.data?.data} /> : null
            }
          />
        );
      } else {
        setLoading(false);
        toast.error(
          <Toast status={false} message="Something is wrong. Please try again or contact us" />
        );
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        {data?.map((item, index) => {
          let fieldName =
            item.fieldtype == "email" ? `field${item.fieldId}_1_email` : `field${item.fieldId}_1`;
          return (
            <Col key={index} lg={listCol[index] ?? 12}>
              <Input
                item={item}
                isRequired={item.required == "1"}
                fieldName={fieldName}
                formik={formik}
                setFieldFile={setFieldFile}
                fieldFile={fieldFile}
                inputClass={inputClass}
                labelClass={labelClass}
              />
            </Col>
          );
        })}
      </Row>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <FriendlyCaptcha setCaptcha={setCaptcha} />
        <Button
          variant="success"
          className="fw-bold text-uppercase px-30px py-13px lh-sm rounded-4 mt-2"
          type="submit"
          disabled={loading || !captcha}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </>
          ) : (
            "Send inquiry"
          )}
        </Button>
      </div>
    </Form>
  );
}

export default FormComponent;
