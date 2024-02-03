import ControlModeProvider, { ControlBarContext } from "./control-bar.provider";
import KubeComponentsProvider, {
  KubeComponentsContext,
} from "./kube-components.provider";



export enum ControlMode {
  CreatePod,
  CreateService,
  CreateConfigMap,
  CreateSecret,
  UpdatePod,
  UpdateService,
  UpdateConfigMap,
  UpdateSecret,
}





export {
  ControlBarContext,
  ControlModeProvider,
  KubeComponentsContext,
  KubeComponentsProvider,
};
