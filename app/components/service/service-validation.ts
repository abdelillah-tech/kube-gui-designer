import * as Yup from "yup";
import {
  KUBE_NAME_REGEX,
  KUBELET_API_PORT,
  KUBE_SCHEDULER_PORT,
  KUBE_CONTROLLER_MANAGER_PORT,
  KUBE_API_SERVER_PORT,
  HEALTH_CHECK_PORT,
  ETCD_PORT_RANGE,
} from "../shared/constants";

const ServiceSchema = Yup.object().shape({
  name: Yup.string()
    .matches(KUBE_NAME_REGEX, "format is wrong!")
    .min(1, "Too Short!")
    .max(253, "Too Long!")
    .required("Required"),
  port: Yup.number()
    .not(
      [
        KUBELET_API_PORT,
        KUBE_SCHEDULER_PORT,
        KUBE_CONTROLLER_MANAGER_PORT,
        KUBE_API_SERVER_PORT,
        HEALTH_CHECK_PORT,
        ...Array.from(
          { length: ETCD_PORT_RANGE.max - ETCD_PORT_RANGE.min + 1 },
          (_, i) => i + ETCD_PORT_RANGE.min
        ),
      ],
      "This port is reserved"
    )
    .required("Required"),
  targetPort: Yup.number()
    .not(
      [
        KUBELET_API_PORT,
        KUBE_SCHEDULER_PORT,
        KUBE_CONTROLLER_MANAGER_PORT,
        KUBE_API_SERVER_PORT,
        HEALTH_CHECK_PORT,
        ...Array.from(
          { length: ETCD_PORT_RANGE.max - ETCD_PORT_RANGE.min + 1 },
          (_, i) => i + ETCD_PORT_RANGE.min
        ),
      ],
      "This port is reserved"
    )
    .required("Required"),
  namespace: Yup.string()
    .matches(KUBE_NAME_REGEX, "format is wrong!")
    .min(1, "Too Short!")
    .max(253, "Too Long!"),
  label: Yup.string()
    .matches(KUBE_NAME_REGEX, "format is wrong!")
    .min(1, "Too Short!")
    .max(253, "Too Long!")
    .required("Required"),
});

export default ServiceSchema;
