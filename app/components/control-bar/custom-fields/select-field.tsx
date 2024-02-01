import { ErrorMessage, Field } from "formik";

interface ISelectField {
  label: string;
  name: string;
  options: any[];
}

const SelectField = ({ label, name, options }: ISelectField) => (
  <>
    <label>{`${label}:`}</label>
    <Field name={name} className="border rounded-md p-1" as="select">
      <option value="" label="Select a value">
        Select a value
      </option>
      {options.map((opt, index) => (
        <option key={index} value={opt} label={opt}>
          {opt}
        </option>
      ))}
    </Field>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs"
    />
  </>
);

export default SelectField;
