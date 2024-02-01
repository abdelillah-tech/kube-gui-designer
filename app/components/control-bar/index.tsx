
import { useContext } from "react";
import SecretCreationForm from "./forms/secret.form";
import PodCreationForm from "./forms/pod.form";
import ConfigMapCreationForm from "./forms/config-map.form";
import ServiceCreationForm from "./forms/service.form";
import { ControlBarContext, ControlMode } from "../../contexts";

const ControlBar = () => {
  const { controlMode } = useContext(ControlBarContext);

  const getCreationForm = (controlMode: ControlMode) => {
    switch (controlMode) {
      case ControlMode.CreateService:
        return <ServiceCreationForm />;
      case ControlMode.CreateConfigMap:
        return <ConfigMapCreationForm />;
      case ControlMode.CreateSecret:
        return <SecretCreationForm />;
      default:
        return <PodCreationForm />;
    }
  };

  return (
    <aside className="w-1/5 border-r-2 h-full p-1">
      <div className="flex flex-col h-full">
        { getCreationForm(controlMode) }
      </div>
    </aside>
  );
};

export default ControlBar;
