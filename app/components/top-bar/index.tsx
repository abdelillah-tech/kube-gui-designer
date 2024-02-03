import { useContext } from "react";
import { ControlBarContext, ControlMode } from "../../contexts";
import ResultModal from "../result-modal";
import { StandardButton } from "../shared/components";

const TopBar = () => {
  const { setControl } = useContext(ControlBarContext);

  return (
    <>
      <div className="flex justify-between space-x-1">
        <StandardButton
          text="Add Pod"
          handler={() => setControl(ControlMode.CreatePod)}
        />
        <StandardButton
          text="Add Service"
          handler={() => setControl(ControlMode.CreateService)}
        />
        <StandardButton
          text="Add ConfigMap"
          handler={() => setControl(ControlMode.CreateConfigMap)}
        />
        <StandardButton
          text="Add Secrets"
          handler={() => setControl(ControlMode.CreateSecret)}
        />
      </div>
      <div>
        <ResultModal />
      </div>
    </>
  );
};

export default TopBar;
