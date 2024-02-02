import { ConfigSpec, SecretSpec, ServiceSpec } from "../../contexts";
import ConfigMap from "../config-map/config-map";
import Secret from "../secret/secret";
import Service from "../service/service";

interface IBottomBar {
  services: ServiceSpec[];
  configs: ConfigSpec[];
  secrets: SecretSpec[];
}

const BottomBar = ({
  services = [],
  configs = [],
  secrets = [],
}: IBottomBar) => {
  return (
    <div className="flex overflow-x-auto border-t-2 h-1/6 space-x-1 p-1">
      {services.map((service, index) => (
        <Service key={index} service={service} />
      ))}
      {configs.map((config, index) => (
        <ConfigMap key={index} config={config} />
      ))}
      {secrets.map((secret, index) => (
        <Secret key={index} secret={secret} />
      ))}
    </div>
  );
};

export default BottomBar;
