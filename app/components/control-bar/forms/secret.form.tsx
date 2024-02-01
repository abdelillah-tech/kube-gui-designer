import { useContext } from "react";

import { FieldArray, Form, Formik } from "formik";
import {
  KubeComponentsContext,
  SecretSpec,
  SecretType,
} from "../../../contexts";
import { SecretCreationSchema } from "../form-validation";
import SimpleField from "../custom-fields/simple-field";
import AddRemoveController from "../custom-fields/add-remove-controller";
import NameValueField from "../custom-fields/name-value-field";
import SelectField from "../custom-fields/select-field";

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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          createSecret(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values }) => (
        <Form className="flex flex-col h-full">
          <h1 className="font-bold text-2xl">Create Secret</h1>
          <div className="flex flex-col overflow-y-auto grow">
            <SimpleField label="Name" name="name" type="text" />
            <SelectField
              label="Type"
              name="type"
              options={[SecretType.Opaque]}
            />
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
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md w-full"
          >
            Create Secret
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SecretCreationForm;
