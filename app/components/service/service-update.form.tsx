import { Formik } from "formik";

import { useContext } from "react";
import {
  KubeComponentsContext,
  ControlBarContext,
  ControlMode,
} from "../../contexts";
import SimpleField from "../shared/components/fields/simple-field";
import SelectField from "../shared/components/fields/select-field";
import UpdateFormBody from "../shared/components/wrappers/update-form-body";
import ServiceSchema from "./service-validation";
import { ServiceSpec, Protocol } from "../shared/service-types";
import { SimpleStaticField } from "../shared/components";

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
      validationSchema={ServiceSchema}
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
          deleteComponent={() => deleteService(spec.targetPort)}
        >
          <SimpleStaticField label="Name" value={spec.name} />
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
