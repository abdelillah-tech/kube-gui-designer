import { Formik } from "formik";

import { useContext } from "react";
import {
  KubeComponentsContext,
  ServiceSpec,
  Protocol,
} from "../../../../contexts";
import { ServiceCreationSchema } from "../../form-validation";
import SimpleField from "../../custom-fields/simple-field";
import SelectField from "../../custom-fields/select-field";
import CreateFormBody from "../../helpers/create-form-body";


const ServiceCreationForm = () => {
  const { createService } = useContext(KubeComponentsContext);

  const initialValues: ServiceSpec = {
    name: "",
    port: 80,
    targetPort: 80,
    protocol: Protocol.TCP,
    namespace: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ServiceCreationSchema}
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
