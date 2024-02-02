import ControlModeProvider, { ControlBarContext } from "./control-bar.provider";
import KubeComponentsProvider, {
  KubeComponentsContext,
} from "./kube-components.provider";

export type Nodes = {
  [nodeId: string]: string[];
};

export enum Protocol {
  TCP = "TCP",
  SCTP = "SCTP",
  UDP = "UDP",
}

// Pod
export type PodSpec = {
  name: string;
  nodeId?: string;
  replicas: number;
  containerName: string;
  limits: { memory: string; cpu: string };
  image: string;
  port: number;
  namespace?: string;
  secrets: SecretItem[];
  configs: ConfigItem[];
  envs: NameValue[];
};

export type SecretItem = {
  name: string;
  ref: string;
  key: string;
};

export type ConfigItem = {
  name: string;
  ref: string;
  key: string;
};

export type PodType = {
  name: string;
  podId: string;
  containerName: string;
  limits: { memory: string; cpu: string };
  image: string;
  port: number;
  namespace?: string;
  secrets: SecretItem[];
  configs: ConfigItem[];
  envs: NameValue[];
};

export type NameValue = {
  name: string;
  value: string;
};

export type Pods = {
  [podId: string]: PodType;
};

// Service
export type ServiceSpec = {
  name: string;
  protocol: Protocol;
  port: number;
  targetPort: number;
  namespace?: string;
};

export type Services = {
  [targetPort: string]: ServiceSpec;
};

// Config
export type ConfigSpec = {
  name: string;
  configs: NameValue[];
};

export type Config = {
  name: string;
  configs: NameValue[];
};

export type Configs = {
  [name: string]: Config;
};

// Secret
export enum SecretType {
  Opaque = "Opaque",
}

export type SecretSpec = {
  name: string;
  type: SecretType;
  secrets: NameValue[];
};

export type Secrets = {
  [name: string]: SecretSpec;
};

export type Secret = {
  name: string;
  secrets: NameValue[];
};

export type Components = {
  nodes: Nodes;
  pods: Pods;
  services: Services;
  configs: Configs;
  secrets: Secrets;
};

export enum ResourceType {
  Pod = "Pod",
  Service = "Service",
  ConfigMap = "ConfigMap",
  Secret = "Secret",
}

export enum ControlMode {
  CreatePod,
  CreateService,
  CreateConfigMap,
  CreateSecret,
  UpdatePod,
  UpdateService,
  UpdateConfigMap,
  UpdateSecret,
}

export type SpecType = ConfigSpec | SecretSpec | ServiceSpec | PodSpec;

export type ControlModeType = {
  controlMode: ControlMode;
  spec?: SpecType;
  setControl: (mode: ControlMode, spec?: SpecType) => void;
};

export type KubeComponentsType = {
  components: Components;
  createPods: (podSpec: PodSpec) => void;
  createService: (serviceSpec: ServiceSpec) => void;
  createConfigMap: (configMapSpec: ConfigSpec) => void;
  createSecret: (createSecret: SecretSpec) => void;
  deletePod: (podName: string) => void;
  deleteService: (servicePort: string) => void;
  deleteConfigMap: (configRef: string) => void;
  deleteSecret: (secretRef: string) => void;
};

export {
  ControlBarContext,
  ControlModeProvider,
  KubeComponentsContext,
  KubeComponentsProvider,
};
