import { FieldArray, Formik } from "formik";

import { useContext } from "react";
import { KubeComponentsContext } from "../../contexts";
import SimpleField from "../shared/components/fields/simple-field";
import CreateFormBody from "../shared/components/wrappers/create-form-body";
import ConfigSchema from "./config-map-validation";
import { ConfigSpec } from "../shared/config-map-types";
import { ArrayField } from "../shared/components";

const ConfigMapCreationForm = () => {
  const { createConfigMap } = useContext(KubeComponentsContext);

  const initialValues: ConfigSpec = {
    name: "",
    configs: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ConfigSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          createConfigMap(values);
          setSubmitting(false);
          resetForm();
        }, 400);
      }}
    >
      {({ values }) => (
        <CreateFormBody title="Create Config Map" submitTitle="Add a Config">
          <SimpleField label="Name" name="name" type="text" />
          <ArrayField items={values.configs} name="configs" label="Configs" />
        </CreateFormBody>
      )}
    </Formik>
  );
};

export default ConfigMapCreationForm;
