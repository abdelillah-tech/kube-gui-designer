import { Formik } from "formik";

import { useContext } from "react";
import {
  KubeComponentsContext,
  ControlBarContext,
  ControlMode,
} from "../../contexts";
import UpdateFormBody from "../shared/components/wrappers/update-form-body";
import ConfigSchema from "./config-map-validation";
import { ConfigSpec } from "../shared/config-map-types";
import { ArrayField, SimpleStaticField } from "../shared/components";

interface IConfigMapUpdateForm {
  spec: ConfigSpec;
}

const ConfigMapUpdateForm = ({ spec }: IConfigMapUpdateForm) => {
  const { deleteConfigMap, createConfigMap } = useContext(
    KubeComponentsContext
  );
  const { setControl } = useContext(ControlBarContext);

  const initialValues: ConfigSpec = { ...spec };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ConfigSchema}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          createConfigMap(values);
          setSubmitting(false);
          setControl(ControlMode.CreatePod);
        }, 400);
      }}
    >
      {({ values }) => (
        <UpdateFormBody
          title="Update Config Map"
          deleteComponent={() => deleteConfigMap(spec.name)}
        >
          <SimpleStaticField label="Name" value={spec.name} />
          <ArrayField items={values.configs} name="configs" label="Configs" />
        </UpdateFormBody>
      )}
    </Formik>
  );
};

export default ConfigMapUpdateForm;
