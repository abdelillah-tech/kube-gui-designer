import * as Yup from "yup";
import {
  KUBE_NAME_REGEX,
  ENV_NAME_REGEX,
  ENV_VALUE_REGEX,
} from "../shared/constants";

export const ConfigSchema = Yup.object().shape({
  name: Yup.string()
    .matches(KUBE_NAME_REGEX, "format is wrong!")
    .min(1, "Too Short!")
    .max(253, "Too Long!")
    .required("Required"),
  configs: Yup.array()
    .of(
      Yup.object({
        name: Yup.string()
          .matches(ENV_NAME_REGEX, "format is wrong!")
          .required("Required"),
        value: Yup.string().matches(ENV_VALUE_REGEX, "format is wrong!"),
      })
    )
    .min(1, "You must define a config"),
});

export default ConfigSchema;
