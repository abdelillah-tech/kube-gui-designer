import { FieldArray, Formik } from "formik";

import { useContext } from "react";
import { KubeComponentsContext } from "../../contexts";
import SimpleField from "../shared/components/fields/simple-field";
import AddRemoveController from "../shared/components/add-remove-controller";
import PodSecretField from "../shared/components/fields/pod-secret-field";
import PodConfigField from "../shared/components/fields/pod-config-field";
import NameValueField from "../shared/components/fields/name-value-field";
import CreateFormBody from "../shared/components/wrappers/create-form-body";
import PodSchema from "./pod-validation";
import { PodSpec } from "../shared/pod-types";
import SmallButton from "../shared/components/buttons/small-button";

const PodCreationForm = () => {
  const { createPods, components } = useContext(KubeComponentsContext);

  const initialValues: PodSpec = {
    name: "",
    nodeId: "default",
    replicas: 0,
    image: "",
    port: 80,
    namespace: "",
    label: "",
    secrets: [],
    configs: [],
    envs: [],
    containerName: "",
    limits: {
      memory: "",
      cpu: "",
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PodSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          createPods(values);
          setSubmitting(false);
          resetForm();
        }, 400);
      }}
    >
      {({ values }) => (
        <CreateFormBody title="Create Pod" submitTitle="Create a Pod">
          <SimpleField label="Name" name="name" type="text" />

          <SimpleField label="Node ID" name="nodeId" type="text" />

          <SimpleField label="Replicas" name="replicas" type="number" />

          <SimpleField label="Port" name="port" type="number" />

          <SimpleField
            label="Container Name"
            name="containerName"
            type="text"
          />

          <SimpleField label="Memory limit" name="limits.memory" type="text" />

          <SimpleField label="CPU limit" name="limits.cpu" type="text" />

          <SimpleField label="Image" name="image" type="text" />

          <SimpleField label="Namespace" name="namespace" type="text" />

          <SimpleField label="Label" name="label" type="text" />

          <label className="font-bold text-gray-800">Configs:</label>
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
                      <div className="text-center font-bold text-gray-800">No ConfigMap defined</div>
                    )
                  )
                ) : (
                  <SmallButton
                    text="Add a config"
                    handler={() => arrayHelpers.push("")}
                  />
                )}
              </div>
            )}
          />
          <label className="font-bold text-gray-800">Secrets:</label>
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
                      <div className="text-center font-bold text-gray-800">No Secret defined</div>
                    )
                  )
                ) : (
                  <SmallButton
                    text="Add a secret"
                    handler={() => arrayHelpers.push("")}
                  />
                )}
              </div>
            )}
          />
          <label className="font-bold text-gray-800">Environments:</label>
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
                  <SmallButton
                    text="Add an env"
                    handler={() => arrayHelpers.push("")}
                  />
                )}
              </div>
            )}
          />
        </CreateFormBody>
      )}
    </Formik>
  );
};

export default PodCreationForm;
