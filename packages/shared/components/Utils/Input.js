import { useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
import useTrans from "@hook/useTrans";
import en from "@shared_lang/en";
import vi from "@shared_lang/vi";
import Select from "./Select";
const Input = ({
  isRequired,
  formik,
  fieldName,
  item,
  setFieldFile,
  fieldFile,
  fs,
  customField,
  inputClass,
  labelClass,
}) => {
  const trans = useTrans(en, vi);
  const getfile = (e, value) => {
    setFieldFile({ fileData: e.currentTarget.files[0], fieldName: value });
  };
  useEffect(() => {
    const uploadFile = (e) => {
      const fileName = e.target.files[0].name;
      const selectText = `${fileName}`;
      if (document.querySelector(".text-uploadedfile")) {
        document.querySelector(".text-uploadedfile").innerHTML = selectText;
      } else {
        document.querySelector(".inputupload").append(filedatatest);
      }
    };
    if (document.querySelector(".inputupload input")) {
      const input = document.querySelector(".inputupload input");
      input.addEventListener("change", uploadFile);
    }
    return () => {
      window.removeEventListener("change", uploadFile);
    };
  }, []);
  return (
    <Form.Group
      className={`mb-3 ${
        customField && item?.name.toLowerCase() == "your email"
          ? "w-xl-50 float-none float-xl-start"
          : ""
      } ${
        customField && item?.name.toLowerCase() == "phone"
          ? "w-xl-50 float-none float-xl-start ps-xl-3"
          : ""
      }`}
    >
      <Form.Label
        className={`${labelClass} fs-8 font-opensans ${
          item.fieldtype == "fileupload" ? "d-flex justify-content-between" : ""
        }`}
      >
        <p className={`mb-0  ${fs ? fs : "fs-6"}`}>
          {item.name ?? ""}
          {isRequired ? <span className="text-danger ms-1">*</span> : ""}
        </p>
        {item.fieldtype == "fileupload" ? (
          <span className="fst-italic">Upload maximum: 1.5MB</span>
        ) : null}
      </Form.Label>
      {item.fieldtype == "textarea" ? (
        <Form.Control
          as={item.fieldtype}
          rows={3}
          name={fieldName}
          id={fieldName}
          placeholder={"Anything specific you want to know or inform us about ?"}
          className={`${inputClass} rounded-4 py-20px px-2rem lh-lg`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[fieldName]}
        />
      ) : item.fieldtype == "select" ? (
        <>
          <Select
            item={item}
            fieldName={fieldName}
            inputClass={inputClass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[fieldName]}
          />
          {formik.touched[fieldName] && formik.errors[fieldName] ? (
            <Alert className="mt-1 p-1" variant="warning">
              {formik.errors[fieldName]}
            </Alert>
          ) : null}
        </>
      ) : (
        <>
          <div
            className={
              item.fieldtype == "fileupload"
                ? "inputupload d-flex justify-content-between align-items-center border rounded-4"
                : null
            }
          >
            {item.fieldtype == "fileupload" ? (
              <div className="text-uploadedfile text-truncate ps-3"></div>
            ) : null}
            <div className={item.fieldtype == "fileupload" ? "w-110px position-relative" : null}>
              {item.fieldtype == "fileupload" ? (
                <span className="textupload position-absolute start-50 top-50 translate-middle text-center w-100 fw-semibold">
                  {trans.licenseModal.txt_update}
                </span>
              ) : null}
              <Form.Control
                type={
                  item.name == "Phone number"
                    ? "number"
                    : item.fieldtype == "fileupload"
                    ? "file"
                    : item.fieldtype
                }
                name={fieldName}
                id={fieldName}
                className={`${inputClass} ${
                  item.fieldtype == "fileupload"
                    ? "textup rounded-0 border-0 bg-transparent position-relative"
                    : "rounded-4"
                } px-3 py-2 lh-lg`}
                onChange={
                  item.fieldtype == "fileupload"
                    ? (e) => getfile(e, fieldName)
                    : formik.handleChange
                }
                onBlur={formik.handleBlur}
                defaultValue={
                  item.fieldtype == "fileupload" && formik.values[fieldName] == ""
                    ? fieldFile?.fileData?.name
                    : formik.values[fieldName]
                }
              />
            </div>
          </div>
          {formik.touched[fieldName] && formik.errors[fieldName] ? (
            <Alert className="mt-1 p-1" variant="warning">
              {formik.errors[fieldName]}
            </Alert>
          ) : null}
        </>
      )}
    </Form.Group>
  );
};

export default Input;
