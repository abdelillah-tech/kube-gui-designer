import { Field, ErrorMessage } from "formik";

interface ISimpleField {
  label: string;
  name: string;
  type: string;
}

const SimpleField = ({ label, name, type }: ISimpleField) => (
  <>
    <label>{`${label}:`}</label>
    <Field type={type} name={name} className="border rounded-md p-1" />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs"
    />
  </>
);

export default SimpleField;
