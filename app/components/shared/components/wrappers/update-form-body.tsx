import { Form } from "formik";

interface IFormBody {
  children: any;
  title: string;
  deleteComponent: () => void;
}

const UpdateFormBody = ({ children, title, deleteComponent }: IFormBody) => (
  <Form className="flex flex-col h-full">
    <h1 className="font-bold text-2xl pb-3 text-gray-800">{title}</h1>
    <div className="flex flex-col overflow-y-auto grow">{children}</div>
    <div className="flex w-full p-2 space-x-1">
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold p-2 rounded-full w-full"
      >
        update
      </button>
      <button
        type="button"
        className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full w-full"
        onClick={deleteComponent}
      >
        delete
      </button>
    </div>
  </Form>
);

export default UpdateFormBody;
