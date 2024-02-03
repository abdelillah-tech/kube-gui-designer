import { Form } from "formik";

interface IFormBody {
  children: any;
  title: string;
  submitTitle: string;
}

const CreateFormBody = ({ children, title, submitTitle }: IFormBody) => (
  <Form className="flex flex-col h-full">
    <h1 className="font-bold text-2xl">{title}</h1>
    <div className="flex flex-col overflow-y-auto grow">{children}</div>
    <div className="p-2">
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold rounded-full w-full p-2"
      >
        {submitTitle}
      </button>
    </div>
  </Form>
);

export default CreateFormBody;
