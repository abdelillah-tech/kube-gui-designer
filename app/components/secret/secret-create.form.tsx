import { useContext } from "react";

import { Formik } from "formik";
import { KubeComponentsContext } from "../../contexts";
import SimpleField from "../shared/components/fields/simple-field";
import SelectField from "../shared/components/fields/select-field";
import CreateFormBody from "../shared/components/wrappers/create-form-body";
import SecretSchema from "./secret-validation";
import { SecretSpec, SecretType } from "../shared/secret-types";
import { ArrayField } from "../shared/components";

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
      validationSchema={SecretSchema}
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
          <ArrayField items={values.secrets} name="secrets" label="Secrets" />
        </CreateFormBody>
      )}
    </Formik>
  );
};

export default SecretCreationForm;
