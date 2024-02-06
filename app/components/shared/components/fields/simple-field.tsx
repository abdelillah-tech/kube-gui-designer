import { Field, ErrorMessage } from "formik";

interface ISimpleField {
  label: string;
  name: string;
  type: string;
}

const SimpleField = ({ label, name, type }: ISimpleField) => (
  <div className="flex flex-col">
    <div className="grid grid-cols-3">
      <label className="font-bold text-sm text-gray-800">{`${label}:`}</label>
      <Field type={type} name={name} className="col-span-2 border rounded-md p-1" />
    </div>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs"
    />
  </div>
);

export default SimpleField;
