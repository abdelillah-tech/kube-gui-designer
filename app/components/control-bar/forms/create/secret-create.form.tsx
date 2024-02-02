import { useContext } from "react";

import { FieldArray, Formik } from "formik";
import {
  KubeComponentsContext,
  SecretSpec,
  SecretType,
} from "../../../../contexts";
import { SecretCreationSchema } from "../../form-validation";
import SimpleField from "../../custom-fields/simple-field";
import AddRemoveController from "../../custom-fields/add-remove-controller";
import NameValueField from "../../custom-fields/name-value-field";
import SelectField from "../../custom-fields/select-field";
import CreateFormBody from "../../helpers/create-form-body";

const SecretCreationForm = () => {
  const { createSecret } = useContext(KubeComponentsContext);

  const initialValues: SecretSpec = {
    name: "",
    type: SecretType.Opaque,
    secrets: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SecretCreationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          createSecret(values);
          setSubmitting(false);
          resetForm();
        }, 400);
      }}
    >
      {({ values }) => (
        <CreateFormBody title="Create Secret" submitTitle="Create a Secret">
          <SimpleField label="Name" name="name" type="text" />
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
        </CreateFormBody>
      )}
    </Formik>
  );
};

export default SecretCreationForm;
