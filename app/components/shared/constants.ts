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

export {
  DOCKER_NAME_TAG_REGEX,
  KUBE_NAME_REGEX,
  ENV_NAME_REGEX,
  ENV_VALUE_REGEX,
  MEMORY_LIMIT_REGEX,
  CPU_LIMIT_REGEX,
  NODE_PORT_RANGE,
  ETCD_PORT_RANGE,
  KUBELET_API_PORT,
  KUBE_SCHEDULER_PORT,
  KUBE_CONTROLLER_MANAGER_PORT,
  KUBE_API_SERVER_PORT,
  HEALTH_CHECK_PORT,
};
