import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { FieldArrayRenderProps } from "formik";

interface IAddRemoveController {
  index: number;
  arrayHelpers: FieldArrayRenderProps;
}

const AddRemoveController = ({ index, arrayHelpers }: IAddRemoveController) => (
  <div className="flex flex-col">
    <PlusIcon
      className="text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg w-6 h-6 inline-flex justify-center items-center"
      onClick={() => arrayHelpers.insert(index, "")}
    />
    <MinusIcon
      className="text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg w-6 h-6 inline-flex justify-center items-center"
      onClick={() => arrayHelpers.remove(index)}
    />
  </div>
);

export default AddRemoveController;
