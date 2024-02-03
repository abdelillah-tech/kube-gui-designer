import { Formik } from "formik";

import { useContext } from "react";
import {
  KubeComponentsContext,
} from "../../contexts";
import SimpleField from "../shared/components/fields/simple-field";
import SelectField from "../shared/components/fields/select-field";
import CreateFormBody from "../shared/components/wrappers/create-form-body";
import ServiceSchema from "./service-validation";
import { ServiceSpec, Protocol } from "../shared/service-types";


const ServiceCreationForm = () => {
  const { createService } = useContext(KubeComponentsContext);

  const initialValues: ServiceSpec = {
    name: "",
    port: 80,
    targetPort: 80,
    protocol: Protocol.TCP,
    namespace: "",
    label: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ServiceSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          createService(values);
          setSubmitting(false);
          resetForm();
        }, 400);
      }}
    >
      {() => (
        <CreateFormBody title="Create Service" submitTitle="Create a Service">
          <SimpleField label="Name" name="name" type="text" />

          <SimpleField label="Port" name="port" type="number" />

          <SimpleField label="Target Port" name="targetPort" type="number" />

          <SimpleField label="Label" name="label" type="text" />

          <SelectField
            label="Protocol"
            name="protocol"
            options={[Protocol.TCP, Protocol.SCTP, Protocol.UDP]}
          />

          <SimpleField label="Namespace" name="namespace" type="text" />
        </CreateFormBody>
      )}
    </Formik>
  );
};

export default ServiceCreationForm;
