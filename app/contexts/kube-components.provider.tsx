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
import {
  addPodsOnNodes,
  deleteConfigFromPods,
  deletePodsFromNodes,
  deleteSecretFromPods,
} from "./kube-components.helper";

const defaultKubeComponents: KubeComponentsType = {
  components: {
    nodes: {
      default: [],
    },
    pods: {},
    services: {},
    configs: {},
    secrets: {},
  },
  createPods: (podSpec: PodSpec) => {},
  createService: (serviceSpec: ServiceSpec) => {},
  createConfigMap: (configMapSpec: ConfigSpec) => {},
  createSecret: (createSecret: SecretSpec) => {},
  deletePod: (podName: string) => {},
  deleteService: (servicePort: string) => {},
  deleteConfigMap: (configRef: string) => {},
  deleteSecret: (secretRef: string) => {},
};

export const KubeComponentsContext = createContext<KubeComponentsType>(
  defaultKubeComponents
);

const KubeComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState<Components>(
    defaultKubeComponents.components
  );

  const createPods = (podSpec: PodSpec) => {
    const newPods: Pods = {};
    for (let i = 0; i < podSpec.replicas; i++) {
      const pod: PodType = {
        ...podSpec,
        podId: `${podSpec.name}-${i}`,
        namespace: podSpec.namespace || "default",
      };

      newPods[pod.podId] = pod;
    }

    const nodes = addPodsOnNodes(podSpec.nodeId, components.nodes, newPods);
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

  const deletePod = (podName: string) => {
    const nodes = deletePodsFromNodes(podName, components.nodes);
    delete components.pods[podName];
    setComponents((prevValue) => ({
      ...prevValue,
      nodes: nodes,
      pods: components.pods,
    }));
  };

  const deleteService = (servicePort: string) => {
    delete components.services[servicePort];
    setComponents((prevValue) => ({
      ...prevValue,
      services: components.services,
    }));
  };

  const deleteSecret = (secretRef: string) => {
    const pods = deleteSecretFromPods(secretRef, components.pods);

    delete components.secrets[secretRef];
    setComponents((prevValue) => ({
      ...prevValue,
      pods: pods,
      secrets: components.secrets,
    }));
  };

  const deleteConfigMap = (configRef: string) => {
    const pods = deleteConfigFromPods(configRef, components.pods);

    delete components.configs[configRef];
    setComponents((prevValue) => ({
      ...prevValue,
      pods: pods,
      configs: components.configs,
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
        deletePod,
        deleteService,
        deleteSecret,
        deleteConfigMap,
      }}
    >
      {children}
    </KubeComponentsContext.Provider>
  );
};

export default KubeComponentsProvider;
