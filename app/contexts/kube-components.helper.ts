import { Nodes } from "../components/shared/node-types";
import { Pods } from "../components/shared/pod-types";

export const addPodsOnNodes = (
  nodeId: string = "default",
  nodes: Nodes,
  newPods: Pods
): Nodes => {
  const podIds: string[] = nodes[nodeId] || [];
  podIds.push(...Object.values(newPods).map((pod) => pod.podId));
  nodes[nodeId] = podIds;

  return nodes;
};

export const deletePodsFromNodes = (podName: string, nodes: Nodes): Nodes => {
  var regex = new RegExp(`/${podName}-\d+/`);

  const newNodes = Object.fromEntries(
    Object.entries(nodes).map((node) => {
      const newPodsIds = node[1].filter((podId) => !regex.test(podId));

      return newPodsIds.length === 0 && node[0] !== "default"
        ? []
        : [node[0], newPodsIds];
    })
  );

  return newNodes;
};

export const deleteConfigFromPods = (configRef: string, pods: Pods): Pods => {
  return Object.fromEntries(
    Object.entries(pods).map((pod) => {
      const newConfigs = pod[1].configs.filter(
        (config) => config.ref !== configRef
      );
      pod[1].configs = newConfigs;
      return [pod[0], pod[1]];
    })
  );
};

export const deleteSecretFromPods = (secretRef: string, pods: Pods): Pods => {
  return Object.fromEntries(
    Object.entries(pods).map((pod) => {
      const newSecrets = pod[1].secrets.filter(
        (config) => config.ref !== secretRef
      );
      pod[1].secrets = newSecrets;
      return [pod[0], pod[1]];
    })
  );
};
