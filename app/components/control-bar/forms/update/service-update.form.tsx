import { Formik } from "formik";

import { useContext } from "react";
import {
  KubeComponentsContext,
  ServiceSpec,
  Protocol,
  ControlBarContext,
  ControlMode,
} from "../../../../contexts";
import { ServiceCreationSchema } from "../../form-validation";
import SimpleField from "../../custom-fields/simple-field";
import SelectField from "../../custom-fields/select-field";
import UpdateFormBody from "../../helpers/update-form-body";

interface IServiceUpdateForm {
  spec: ServiceSpec;
}

const ServiceUpdateForm = ({ spec }: IServiceUpdateForm) => {
  const { deleteService } = useContext(KubeComponentsContext);
  const { setControl } = useContext(ControlBarContext);

  const initialValues: ServiceSpec = { ...spec };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ServiceCreationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          setControl(ControlMode.CreatePod);
        }, 400);
      }}
    >
      {() => (
        <UpdateFormBody
          title="Update Service"
          deleteComponent={() => deleteService(spec.name)}
        >
          <label>Name:</label>
          <div className="border rounded-md p-1">{spec.name}</div>

          <SimpleField label="Port" name="port" type="number" />

          <SimpleField label="Target Port" name="targetPort" type="number" />

          <SelectField
            label="Protocol"
            name="protocol"
            options={[Protocol.TCP, Protocol.SCTP, Protocol.UDP]}
          />

          <SimpleField label="Namespace" name="namespace" type="text" />
        </UpdateFormBody>
      )}
    </Formik>
  );
};

export default ServiceUpdateForm;
