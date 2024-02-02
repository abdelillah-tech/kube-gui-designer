import { Form } from "formik";

interface IFormBody {
  children: any;
  title: string;
  deleteComponent: () => void;
}

const UpdateFormBody = ({ children, title, deleteComponent }: IFormBody) => (
  <Form className="flex flex-col h-full">
    <h1 className="font-bold text-2xl">{title}</h1>
    <div className="flex flex-col overflow-y-auto grow">{children}</div>
    <div className="flex w-full space-x-1">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md w-full"
      >
        update
      </button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-md w-full" onClick={deleteComponent}>
        delete
      </button>
    </div>
  </Form>
);

export default UpdateFormBody;
