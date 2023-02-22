import React from "react";
import { Form } from "react-bootstrap";

const Select = ({ item, fieldName, inputClass, onChange, onBlur, value }) => {
  return (
    <Form.Select
      className={`${inputClass} px-3 py-2 lh-lg`}
      name={fieldName}
      id={fieldName}
      onChange={onChange}
      onBlur={onBlur}
    >
      <option disabled selected>
        Choose Product
      </option>
      {item?.fieldOptions.map((item) => {
        return (
          <option key={item?.id} value={item?.value}>
            {item?.label}
          </option>
        );
      })}
    </Form.Select>
  );
};

export default Select;
