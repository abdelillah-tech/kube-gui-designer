import { useContext } from "react";
import SecretCreationForm from "./forms/create/secret-create.form";
import PodCreationForm from "./forms/create/pod-create.form";
import ConfigMapCreationForm from "./forms/create/config-map-create.form";
import ServiceCreationForm from "./forms/create/service-create.form";
import {
  ConfigSpec,
  ControlBarContext,
  ControlMode,
  SecretSpec,
  ServiceSpec,
} from "../../contexts";
import ConfigMapUpdateForm from "./forms/update/config-map-update.form";
import SecretUpdateForm from "./forms/update/secret-update.form";
import ServiceUpdateForm from "./forms/update/service-update.form";

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
