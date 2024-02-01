import { Field, FieldArray, Form, Formik } from "formik";

import { useContext } from "react";
import { KubeComponentsContext, ConfigSpec } from "../../../contexts";
import { ConfigCreationSchema } from "../form-validation";
import SimpleField from "../custom-fields/simple-field";
import AddRemoveController from "../custom-fields/add-remove-controller";
import NameValueField from "../custom-fields/name-value-field";

const ConfigMapCreationForm = () => {
  const { createConfigMap } = useContext(KubeComponentsContext);

  const initialValues: ConfigSpec = {
    name: "",
    configs: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ConfigCreationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          createConfigMap(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values }) => (
        <Form className="flex flex-col h-full">
          <h1 className="font-bold text-2xl">Create Config Map</h1>
          <div className="flex flex-col overflow-y-auto grow">
            <SimpleField label="Name" name="name" type="text" />

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
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md w-full"
          >
            Create Config Map
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ConfigMapCreationForm;
