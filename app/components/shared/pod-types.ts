import { NameValue } from "./types";

export type PodSpec = {
  name: string;
  nodeId?: string;
  replicas: number;
  containerName: string;
  limits: { memory: string; cpu: string };
  image: string;
  port: number;
  namespace?: string;
  label: string;
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

export type Pods = {
  [podId: string]: PodType;
};

export type PodType = PodSpec & {
  podId: string;
};
