import { Configs, ConfigSpec } from "../components/shared/config-map-types";
import { Pods, PodSpec, ConfigItem, SecretItem } from "../components/shared/pod-types";
import { Secrets, SecretSpec } from "../components/shared/secret-types";
import { Services, ServiceSpec } from "../components/shared/service-types";
import { Components, NameValue } from "../components/shared/types";

;

export const mapComponents = (components: Components) => {
  return [
    ...mapPods(components.pods),
    ...mapServices(components.services),
    ...mapConfigs(components.configs),
    ...mapSecrets(components.secrets),
  ];
};

const mapPods = (pods: Pods) => {
  return [
    ...new Map(
      Object.values(pods).map((pod) => [pod["name"], mapPod(pod)])
    ).values(),
  ];
};

const mapServices = (service: Services) => {
  return Object.values(service).map((serviceSpec) => mapService(serviceSpec));
};

const mapConfigs = (configs: Configs) => {
  return Object.values(configs).map((configSpec) => mapConfig(configSpec));
};

const mapSecrets = (secrets: Secrets) => {
  return Object.values(secrets).map((secretSpec) => mapSecret(secretSpec));
};

const mapConfig = (configSpec: ConfigSpec) => {
  return {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: configSpec.name,
    },
    data: configSpec.configs.reduce(
      (acc, config) => ({ ...acc, [config.name]: config.value }),
      {}
    ),
  };
};

const mapSecret = (secretSpec: SecretSpec) => {
  return {
    apiVersion: "v1",
    kind: "Secret",
    metadata: {
      name: secretSpec.name,
    },
    type: secretSpec.type,
    data: secretSpec.secrets.reduce(
      (acc, secret) => ({ ...acc, [secret.name]: secret.value }),
      {}
    ),
  };
};

const mapService = (configSpec: ServiceSpec) => {
  return {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: configSpec.name,
    },
    spec: {
      selector: {
        app: configSpec.label,
      },
      ports: [
        {
          protocol: configSpec.protocol,
          port: configSpec.port,
          targetPort: configSpec.targetPort,
        },
      ],
    },
  };
};

const mapPod = (podSpec: PodSpec) => {
  return {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: podSpec.name,
    },
    spec: {
      replicas: podSpec.replicas,
      selector: {
        matchLabels: {
          app: podSpec.label,
        },
      },
      template: {
        metadata: {
          labels: {
            app: podSpec.label,
          },
        },
        spec: {
          containers: [
            {
              name: podSpec.containerName,
              image: podSpec.image,
              resources: {
                limits: {
                  memory: podSpec.limits.memory,
                  cpu: podSpec.limits.cpu,
                },
              },
              ports: [
                {
                  containerPort: podSpec.port,
                },
              ],
              env: [
                ...podSpec.configs.map((config) => mapConfigItem(config)),
                ...podSpec.secrets.map((secret) => mapSecretItem(secret)),
                ...podSpec.envs.map((env) => mapEnvs(env)),
              ],
            },
          ],
        },
      },
    },
  };
};

const mapConfigItem = (configItem: ConfigItem) => {
  return {
    name: configItem.name,
    valueFrom: {
      configMapKeyRef: {
        name: configItem.ref,
        key: configItem.key,
      },
    },
  };
};

const mapSecretItem = (secretItem: SecretItem) => {
  return {
    name: secretItem.name,
    valueFrom: {
      secretKeyRef: {
        name: secretItem.ref,
        key: secretItem.key,
      },
    },
  };
};

const mapEnvs = (env: NameValue) => {
  return {
    name: env.name,
    value: env.value,
  };
};
