import { useContext } from "react";
import {
  ControlBarContext,
  ControlMode,
  KubeComponentsContext,
} from "../../contexts";
import { Formik } from "formik";
import UpdateFormBody from "../shared/components/wrappers/update-form-body";
import SelectField from "../shared/components/fields/select-field";
import SecretSchema from "./secret-validation";
import { SecretSpec, SecretType } from "../shared/secret-types";
import { ArrayField, SimpleStaticField } from "../shared/components";

interface ISecretUpdateForm {
  spec: SecretSpec;
}

const SecretUpdateForm = ({ spec }: ISecretUpdateForm) => {
  const { deleteSecret, createSecret } = useContext(KubeComponentsContext);
  const { setControl } = useContext(ControlBarContext);

  const initialValues: SecretSpec = { ...spec };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SecretSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          createSecret(values);
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
          <SimpleStaticField label="Name" value={spec.name} />
          <SelectField label="Type" name="type" options={[SecretType.Opaque]} />
          <ArrayField items={values.secrets} name="secrets" label="Secrets" />
        </UpdateFormBody>
      )}
    </Formik>
  );
};

export default SecretUpdateForm;
