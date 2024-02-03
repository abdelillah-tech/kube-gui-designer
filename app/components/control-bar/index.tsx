import { useContext } from "react";

import {
  ControlBarContext,
  ControlMode,
} from "../../contexts";
import { ConfigMapCreationForm, ConfigMapUpdateForm } from "../config-map";
import PodCreationForm from "../pod/pod-create.form";
import { SecretCreationForm, SecretUpdateForm } from "../secret";
import { ServiceCreationForm, ServiceUpdateForm } from "../service";
import { ConfigSpec } from "../shared/config-map-types";
import { SecretSpec } from "../shared/secret-types";
import { ServiceSpec } from "../shared/service-types";

const ControlBar = () => {
  const { controlMode, spec } = useContext(ControlBarContext);

  const getCreationForm = (controlMode: ControlMode) => {
    switch (controlMode) {
      case ControlMode.CreateService:
        return <ServiceCreationForm />;
      case ControlMode.CreateConfigMap:
        return <ConfigMapCreationForm />;
      case ControlMode.CreateSecret:
        return <SecretCreationForm />;
      case ControlMode.UpdateConfigMap:
        return <ConfigMapUpdateForm spec={spec as ConfigSpec} />;
      case ControlMode.UpdateSecret:
        return <SecretUpdateForm spec={spec as SecretSpec} />;
      case ControlMode.UpdateService:
        return <ServiceUpdateForm spec={spec as ServiceSpec} />;
      default:
        return <PodCreationForm />;
    }
  };

  return (
    <div className="flex flex-col h-full">{getCreationForm(controlMode)}</div>
  );
};

export default ControlBar;
