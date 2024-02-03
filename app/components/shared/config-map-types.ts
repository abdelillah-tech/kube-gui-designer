import { NameValue } from "./types";

export type ConfigSpec = {
  name: string;
  configs: NameValue[];
};

export type Config = {
  name: string;
  configs: NameValue[];
};

export type Configs = {
  [name: string]: ConfigSpec;
};
