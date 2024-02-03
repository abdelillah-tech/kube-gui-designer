import { ErrorMessage, Field } from "formik";

interface ISelectField {
  label: string;
  name: string;
  options: any[];
}

const SelectField = ({ label, name, options }: ISelectField) => (
  <div className="flex flex-col">
    <div className="grid grid-cols-3">
      <label className="font-bold text-gray-800">{`${label}:`}</label>
      <Field name={name} className="col-span-2 border rounded-md p-1" as="select">
        <option value="" label="Select a value">
          Select a value
        </option>
        {options.map((opt, index) => (
          <option key={index} value={opt} label={opt}>
            {opt}
          </option>
        ))}
      </Field>
    </div>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs"
    />
  </div>
);

export default SelectField;
