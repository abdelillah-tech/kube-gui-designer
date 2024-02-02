import { useContext } from "react";
import {
  ControlBarContext,
  ControlMode,
  KubeComponentsContext,
  SecretSpec,
  SecretType,
} from "../../../../contexts";
import { SecretCreationSchema } from "../../form-validation";
import { FieldArray, Formik } from "formik";
import UpdateFormBody from "../../helpers/update-form-body";
import AddRemoveController from "../../custom-fields/add-remove-controller";
import NameValueField from "../../custom-fields/name-value-field";
import SelectField from "../../custom-fields/select-field";

interface ISecretUpdateForm {
  spec: SecretSpec;
}

const SecretUpdateForm = ({ spec }: ISecretUpdateForm) => {
  const { deleteSecret } = useContext(KubeComponentsContext);
  const { setControl } = useContext(ControlBarContext);

  const initialValues: SecretSpec = { ...spec };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SecretCreationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          setControl(ControlMode.CreatePod);
        }, 400);
      }}
    >
      {({ values }) => (
        <UpdateFormBody
          title="Update Secret"
          deleteComponent={() => deleteSecret(spec.name)}
        >
          <label>Name:</label>
          <div className="border rounded-md p-1">{spec.name}</div>
          
          <SelectField label="Type" name="type" options={[SecretType.Opaque]} />
          <label>Secrets:</label>
          <FieldArray
            name="secrets"
            render={(arrayHelpers) => (
              <div className="flex flex-col">
                {values.secrets && values.secrets.length > 0 ? (
                  values.secrets.map((secret, index) => (
                    <div key={index} className="inline-block">
                      <div className="flex justify-between items-center border rounded-md p-1 overflow-hidden ease-in-out">
                        <NameValueField index={index} prefix="secrets" />
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
                    Add a secret
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

export default SecretUpdateForm;
