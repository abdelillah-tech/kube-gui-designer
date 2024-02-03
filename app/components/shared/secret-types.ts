import { NameValue } from "./types";

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
