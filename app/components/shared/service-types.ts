export type ServiceSpec = {
  name: string;
  protocol: Protocol;
  port: number;
  targetPort: number;
  namespace?: string;
  label?: string;
};

export enum Protocol {
  TCP = "TCP",
  SCTP = "SCTP",
  UDP = "UDP",
}

export type Services = {
  [targetPort: string]: ServiceSpec;
};