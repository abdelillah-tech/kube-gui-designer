import ConfigMap from "../config-map/config-map";
import Secret from "../secret/secret";
import Service from "../service/service";
import { ConfigSpec } from "../shared/config-map-types";
import { SecretSpec } from "../shared/secret-types";
import { ServiceSpec } from "../shared/service-types";

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
    <>
      {services.map((service, index) => (
        <Service key={index} service={service} />
      ))}
      {configs.map((config, index) => (
        <ConfigMap key={index} config={config} />
      ))}
      {secrets.map((secret, index) => (
        <Secret key={index} secret={secret} />
      ))}
    </>
  );
};

export default BottomBar;
