import { Form } from "formik";
import {
  ConfigSpec,
  PodSpec,
  SecretSpec,
  ServiceSpec,
} from "../../../contexts";

interface IFormBody {
  children: any;
  title: string;
  submitTitle: string;
  values: ConfigSpec | SecretSpec | PodSpec | ServiceSpec;
}

const FormBody = ({ children, title, submitTitle, values }: IFormBody) => (
  <Form className="flex flex-col h-full">
    <h1 className="font-bold text-2xl">{title}</h1>
    <div className="flex flex-col overflow-y-auto grow">{children}</div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md w-full"
    >
      {submitTitle}
    </button>
  </Form>
);

export default FormBody;
