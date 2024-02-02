import {
  ConfigItem,
  ConfigSpec,
  NameValue,
  PodSpec,
  SecretItem,
  SecretSpec,
  ServiceSpec,
} from "../contexts";

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

const mapServices = (configSpec: ServiceSpec) => {
  return {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: configSpec.name,
    },
    spec: {
      selector: {
        app: "mongo",
      },
      ports: [
        {
          protocol: configSpec.protocol,
          port: configSpec.port,
          targetPort: configSpec.port,
        },
      ],
    },
  };
};

const mapPods = (podSpec: PodSpec) => {
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
          app: "mongo",
        },
      },
      template: {
        metadata: {
          labels: {
            app: "mongo",
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
