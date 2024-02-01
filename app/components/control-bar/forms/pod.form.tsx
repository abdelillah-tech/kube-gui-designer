import { FieldArray, Form, Formik } from "formik";

import { useContext } from "react";
import { KubeComponentsContext, PodSpec } from "../../../contexts";
import { PodCreationSchema } from "../form-validation";
import SimpleField from "../custom-fields/simple-field";
import AddRemoveController from "../custom-fields/add-remove-controller";
import PodSecretField from "../custom-fields/pod-secret-field";
import PodConfigField from "../custom-fields/pod-config-field";
import NameValueField from "../custom-fields/name-value-field";

const PodCreationForm = () => {
  const { createPods, components } = useContext(KubeComponentsContext);

  const initialValues: PodSpec = {
    name: "",
    nodeId: "default",
    replicas: 0,
    image: "",
    port: 80,
    namespace: "",
    secrets: [],
    configs: [],
    envs: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PodCreationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          createPods(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values }) => (
        <Form className="flex flex-col h-full">
          <h1 className="font-bold text-2xl">Create Pod</h1>
          <div className="flex flex-col overflow-y-auto grow">
            <SimpleField label="Name" name="name" type="text" />

            <SimpleField label="Node ID" name="nodeId" type="text" />

            <SimpleField label="Replicas" name="replicas" type="number" />

            <SimpleField label="Port" name="port" type="number" />

            <SimpleField label="Image" name="image" type="text" />

            <SimpleField label="Namespace" name="namespace" type="text" />

            <label>Configs:</label>
            <FieldArray
              name="configs"
              render={(arrayHelpers) => (
                <div className="flex flex-col">
                  {values.configs && values.configs.length > 0 ? (
                    values.configs.map((config, index) =>
                      Object.keys(components.configs).length ? (
                        <PodConfigField
                          index={index}
                          configs={components.configs}
                          selected={config}
                          arrayHelpers={arrayHelpers}
                        />
                      ) : (
                        <div className="text-center">No ConfigMap defined</div>
                      )
                    )
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
            <label>Secrets:</label>
            <FieldArray
              name="secrets"
              render={(arrayHelpers) => (
                <div className="flex flex-col">
                  {values.secrets && values.secrets.length > 0 ? (
                    values.secrets.map((secret, index) =>
                      Object.keys(components.secrets).length ? (
                        <PodSecretField
                          index={index}
                          secrets={components.secrets}
                          selected={secret}
                          arrayHelpers={arrayHelpers}
                        />
                      ) : (
                        <div className="text-center">No Secret defined</div>
                      )
                    )
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
            <label>Envs:</label>
            <FieldArray
              name="envs"
              render={(arrayHelpers) => (
                <div className="flex flex-col">
                  {values.envs && values.envs.length > 0 ? (
                    values.envs.map((env, index) => (
                      <div key={index} className="inline-block">
                        <div
                          key={index}
                          className="flex justify-between items-center border rounded-md p-1"
                        >
                          <NameValueField index={index} prefix="envs" />
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
                      Add an env
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
            Create Pod
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PodCreationForm;
