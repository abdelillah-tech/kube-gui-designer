import * as Yup from "yup";
import {
  CPU_LIMIT_REGEX,
  DOCKER_NAME_TAG_REGEX,
  ENV_NAME_REGEX,
  ENV_VALUE_REGEX,
  ETCD_PORT_RANGE,
  HEALTH_CHECK_PORT,
  KUBELET_API_PORT,
  KUBE_API_SERVER_PORT,
  KUBE_CONTROLLER_MANAGER_PORT,
  KUBE_NAME_REGEX,
  KUBE_SCHEDULER_PORT,
  MEMORY_LIMIT_REGEX,
} from "../shared/constants";

const PodSchema = Yup.object().shape({
  name: Yup.string()
    .matches(KUBE_NAME_REGEX, "format is wrong!")
    .min(1, "Too Short!")
    .max(253, "Too Long!")
    .required("Required"),
  replicas: Yup.number()
    .min(1, "Too Short!")
    .max(5, "Too Long!")
    .required("Required"),
  containerName: Yup.string()
    .matches(ENV_NAME_REGEX, "format is wrong!")
    .required("Required"),
  image: Yup.string()
    .matches(DOCKER_NAME_TAG_REGEX, "format is wrong!")
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
  limits: Yup.object({
    memory: Yup.string()
      .matches(MEMORY_LIMIT_REGEX, "format is wrong!")
      .required("Required"),
    cpu: Yup.string()
      .matches(CPU_LIMIT_REGEX, "format is wrong!")
      .required("Required"),
  }),
  namespace: Yup.string()
    .matches(KUBE_NAME_REGEX, "format is wrong!")
    .min(1, "Too Short!")
    .max(253, "Too Long!"),
  label: Yup.string()
    .matches(KUBE_NAME_REGEX, "format is wrong!")
    .min(1, "Too Short!")
    .max(253, "Too Long!")
    .required("Required"),
  secrets: Yup.array().of(
    Yup.object({
      name: Yup.string()
        .matches(ENV_NAME_REGEX, "format is wrong!")
        .required("Required"),
      ref: Yup.string()
        .matches(ENV_VALUE_REGEX, "format is wrong!")
        .required("Required"),
      key: Yup.string()
        .matches(ENV_NAME_REGEX, "format is wrong!")
        .required("Required"),
    })
  ),
  configs: Yup.array().of(
    Yup.object({
      name: Yup.string()
        .matches(ENV_NAME_REGEX, "format is wrong!")
        .required("Required"),
      ref: Yup.string()
        .matches(ENV_VALUE_REGEX, "format is wrong!")
        .required("Required"),
      key: Yup.string()
        .matches(ENV_NAME_REGEX, "format is wrong!")
        .required("Required"),
    })
  ),
  envs: Yup.array().of(
    Yup.object({
      name: Yup.string()
        .matches(ENV_NAME_REGEX, "format is wrong!")
        .required("Required"),
      value: Yup.string().matches(ENV_VALUE_REGEX, "format is wrong!"),
    })
  ),
});

export default PodSchema;
