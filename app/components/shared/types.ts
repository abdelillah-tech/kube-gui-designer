import { ConfigSpec, Configs } from "./config-map-types";
import { Nodes } from "./node-types";
import { PodSpec, Pods } from "./pod-types";
import { SecretSpec, Secrets } from "./secret-types";
import { ServiceSpec, Services } from "./service-types";

export type NameValue = {
  name: string;
  value: string;
};

export enum ResourceType {
  Pod = "Pod",
  Service = "Service",
  ConfigMap = "ConfigMap",
  Secret = "Secret",
}

export type Components = {
  nodes: Nodes;
  pods: Pods;
  services: Services;
  configs: Configs;
  secrets: Secrets;
};

export type SpecType = ConfigSpec | SecretSpec | ServiceSpec | PodSpec;
