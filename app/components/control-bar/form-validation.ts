import * as Yup from "yup";

const DOCKER_NAME_TAG_REGEX =
  /^(?:(?=[^:\/]{4,253})(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(?:\.(?!-)[a-zA-Z0-9-]{1,63}(?<!-))*(?::[0-9]{1,5})?\/)?((?![._-])(?:[a-z0-9._-]*)(?<![._-])(?:\/(?![._-])[a-z0-9._-]*(?<![._-]))*)(?::(?![.-])[a-zA-Z0-9_.-]{1,128})?$/;

const KUBE_NAME_REGEX = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;

const ENV_NAME_REGEX = /^[a-zA-Z0-9_]+$/;
const ENV_VALUE_REGEX = KUBE_NAME_REGEX;

const MEMORY_LIMIT_REGEX = /^([+-]?[0-9.]+)([eEinumkKMGTP]*[-+]?[0-9]*)$/;
const CPU_LIMIT_REGEX = /^[0-9]+m?$/;

const NODE_PORT_RANGE = { min: 30000, max: 32767 };
const ETCD_PORT_RANGE = { min: 2379, max: 2380 };
const KUBELET_API_PORT = 10250;
const KUBE_SCHEDULER_PORT = 10259;
const KUBE_CONTROLLER_MANAGER_PORT = 10257;
const KUBE_API_SERVER_PORT = 6443;
const HEALTH_CHECK_PORT = 9099;

export const PodCreationSchema = Yup.object().shape({
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

export const ServiceCreationSchema = Yup.object().shape({
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

export const ConfigCreationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(KUBE_NAME_REGEX, "format is wrong!")
    .min(1, "Too Short!")
    .max(253, "Too Long!")
    .required("Required"),
  configs: Yup.array().of(
    Yup.object({
      name: Yup.string()
        .matches(ENV_NAME_REGEX, "format is wrong!")
        .required("Required"),
      value: Yup.string().matches(ENV_VALUE_REGEX, "format is wrong!"),
    })
  ),
});

export const SecretCreationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(KUBE_NAME_REGEX, "format is wrong!")
    .min(1, "Too Short!")
    .max(253, "Too Long!")
    .required("Required"),
  secrets: Yup.array().of(
    Yup.object({
      name: Yup.string()
        .matches(ENV_NAME_REGEX, "format is wrong!")
        .required("Required"),
      value: Yup.string().matches(ENV_VALUE_REGEX, "format is wrong!"),
    })
  ),
});
