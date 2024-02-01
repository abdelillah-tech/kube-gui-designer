import ControlModeProvider, { ControlBarContext } from "./control-bar.provider";
import KubeComponentsProvider, {
  KubeComponentsContext,
} from "./kube-components.provider";

export type Node = {
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
  nodes: Node;
  pods: Pods;
  services: Services;
  configs: Configs;
  secrets: Secrets;
  envs: NameValue[];
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

export type ControlModeType = {
  controlMode: ControlMode;
  setControlMode: (mode: ControlMode) => void;
};

export type KubeComponentsType = {
  components: Components;
  createPods: (podSpec: PodSpec) => void;
  createService: (serviceSpec: ServiceSpec) => void;
  createConfigMap: (configMapSpec: ConfigSpec) => void;
  createSecret: (createSecret: SecretSpec) => void;
};

export {
  ControlBarContext,
  ControlModeProvider,
  KubeComponentsContext,
  KubeComponentsProvider,
};
