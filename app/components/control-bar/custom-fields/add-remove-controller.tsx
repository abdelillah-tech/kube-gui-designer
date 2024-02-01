import { FieldArrayRenderProps } from "formik";

interface IAddRemoveController {
  index: number;
  arrayHelpers: FieldArrayRenderProps;
}

const AddRemoveController = ({ index, arrayHelpers }: IAddRemoveController) => (
  <div>
    <button type="button" onClick={() => arrayHelpers.remove(index)}>
      -
    </button>
    <button type="button" onClick={() => arrayHelpers.insert(index, "")}>
      +
    </button>
  </div>
);

export default AddRemoveController;
