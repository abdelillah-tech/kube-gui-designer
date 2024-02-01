import { Form, Formik } from "formik";

import { useContext } from "react";
import { KubeComponentsContext, ServiceSpec, Protocol } from "../../../contexts";
import { ServiceCreationSchema } from "../form-validation";
import SimpleField from "../custom-fields/simple-field";
import SelectField from "../custom-fields/select-field";

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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          createService(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {() => (
        <Form className="flex flex-col h-full">
          <h1 className="font-bold text-2xl">Create Service</h1>
          <div className="flex flex-col grow">
            <SimpleField label="Name" name="name" type="text" />

            <SimpleField label="Port" name="port" type="number" />

            <SimpleField label="Target Port" name="targetPort" type="number" />

            <SelectField
              label="Protocol"
              name="protocol"
              options={[Protocol.TCP, Protocol.SCTP, Protocol.UDP]}
            />

            <SimpleField label="Namespace" name="namespace" type="text" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md w-full"
          >
            Create Service
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ServiceCreationForm;
