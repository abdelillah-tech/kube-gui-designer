import { useContext } from "react";
import { ConfigSpec, ControlBarContext, ControlMode } from "../../contexts";

interface IConfig {
  config: ConfigSpec;
}

const ConfigMap = ({ config }: IConfig) => {
  const { setControl } = useContext(ControlBarContext);
  return (
    <div
      className="inline-block"
      onClick={() => setControl(ControlMode.UpdateConfigMap, config)}
    >
      <div className="max-w-xs w-48 p-1 h-full border-2 rounded-md overflow-hidden ease-in-out">
        <div className="pod-drag flex justify-between space-x-4">
          <div className="text-xs">Config Map</div>
          <div className="text-xs">{config.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ConfigMap;
