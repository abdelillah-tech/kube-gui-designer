import { useContext } from "react";
import { ControlBarContext, ControlMode } from "../../contexts";
import { ConfigSpec } from "../shared/config-map-types";
import SmallCard from "../shared/components/small-card";

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
      <SmallCard label="Config Map" title={config.name} />
    </div>
  );
};

export default ConfigMap;
