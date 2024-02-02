import { FieldArray, Formik } from "formik";

import { useContext } from "react";
import { KubeComponentsContext, ConfigSpec, SpecType, ControlBarContext, ControlMode } from "../../../../contexts";
import { ConfigCreationSchema } from "../../form-validation";
import AddRemoveController from "../../custom-fields/add-remove-controller";
import NameValueField from "../../custom-fields/name-value-field";
import UpdateFormBody from "../../helpers/update-form-body";

interface IConfigMapUpdateForm {
  spec: ConfigSpec;
}

const ConfigMapUpdateForm = ({ spec }: IConfigMapUpdateForm) => {
  const { deleteConfigMap } = useContext(KubeComponentsContext);
  const { setControl } = useContext(ControlBarContext);

  const initialValues: ConfigSpec = { ...spec };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ConfigCreationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          setControl(ControlMode.CreatePod);
        }, 400);
      }}
    >
      {({ values }) => (
        <UpdateFormBody title="Update Config Map" deleteComponent={() => deleteConfigMap(spec.name)}>
          <label>Name:</label>
          <div className="border rounded-md p-1">{spec.name}</div>

          <label>Configs:</label>
          <FieldArray
            name="configs"
            render={(arrayHelpers) => (
              <div className="flex flex-col">
                {values.configs && values.configs.length > 0 ? (
                  values.configs.map((config, index) => (
                    <div key={index} className="inline-block">
                      <div
                        key={index}
                        className="flex justify-between items-center border rounded-md p-1"
                      >
                        <NameValueField index={index} prefix="configs" />
                        <AddRemoveController
                          index={index}
                          arrayHelpers={arrayHelpers}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                    className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold p-1 rounded-md"
                  >
                    Add a config
                  </button>
                )}
              </div>
            )}
          />
        </UpdateFormBody>
      )}
    </Formik>
  );
};

export default ConfigMapUpdateForm;
