import { createContext, useState } from "react";
import {
  KubeComponentsType,
  PodSpec,
  ServiceSpec,
  ConfigSpec,
  SecretSpec,
  Components,
  Pods,
  PodType,
} from ".";

const defaultKubeComponents: KubeComponentsType = {
  components: {
    nodes: {
      default: [],
    },
    pods: {},
    services: {},
    configs: {},
    secrets: {},
    envs: [],
  },
  createPods: (podSpec: PodSpec) => {},
  createService: (serviceSpec: ServiceSpec) => {},
  createConfigMap: (configMapSpec: ConfigSpec) => {},
  createSecret: (createSecret: SecretSpec) => {},
};

export const KubeComponentsContext = createContext<KubeComponentsType>(
  defaultKubeComponents
);

const KubeComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState<Components>(
    defaultKubeComponents.components
  );

  const createPods = (podSpec: PodSpec) => {
    let nodeId = podSpec.nodeId || "default";
    const newPods: Pods = {};
    for (let i = 0; i < podSpec.replicas; i++) {
      const pod: PodType = {
        name: podSpec.name,
        podId: `${podSpec.name}-${i}`,
        image: podSpec.image,
        port: podSpec.port,
        namespace: podSpec.namespace || "default",
        secrets: podSpec.secrets,
        configs: podSpec.configs,
        envs: podSpec.envs,
      };

      newPods[pod.podId] = pod;
    }

    const nodes = components.nodes;
    const podIds: string[] = nodes[nodeId] || [];
    podIds.push(...Object.values(newPods).map((pod) => pod.podId));
    nodes[nodeId] = podIds;

    const pods = { ...components.pods, ...newPods };

    setComponents((prevValue) => ({
      ...prevValue,
      pods,
      nodes,
    }));
  };

  const createService = (serviceSpec: ServiceSpec) => {
    const services = components.services;
    services[serviceSpec.targetPort] = serviceSpec;

    setComponents((prevValue) => ({
      ...prevValue,
      services,
    }));
  };

  const createConfigMap = (configMapSpec: ConfigSpec) => {
    const configs = components.configs;
    configs[configMapSpec.name] = configMapSpec;

    setComponents((prevValue) => ({
      ...prevValue,
      configs,
    }));
  };

  const createSecret = (secretSpec: SecretSpec) => {
    const secrets = components.secrets;
    secrets[secretSpec.name] = secretSpec;

    setComponents((prevValue) => ({
      ...prevValue,
      secrets,
    }));
  };

  return (
    <KubeComponentsContext.Provider
      value={{
        components,
        createPods,
        createService,
        createConfigMap,
        createSecret,
      }}
    >
      {children}
    </KubeComponentsContext.Provider>
  );
};

export default KubeComponentsProvider;
