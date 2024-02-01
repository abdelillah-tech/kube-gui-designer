import { ConfigSpec, SecretSpec, ServiceSpec } from "../../contexts";

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
        <div key={index} className="inline-block">
          <div className="max-w-xs w-48 p-1 h-full border-2 rounded-md overflow-hidden ease-in-out">
            <div className="pod-drag flex justify-between space-x-4">
              <div className="text-xs">Service</div>
              <div className="text-xs">{service.name}</div>
            </div>
            <div className="">{`Port: ${service.port}`}</div>
            <div className="">{`Target Port: ${service.targetPort}`}</div>
            <div className="">{`Protocol: ${service.protocol}`}</div>
          </div>
        </div>
      ))}
      {configs.map((config, index) => (
        <div key={index} className="inline-block">
          <div className="max-w-xs w-48 p-1 h-full border-2 rounded-md overflow-hidden ease-in-out">
            <div className="pod-drag flex justify-between space-x-4">
              <div className="text-xs">Config Map</div>
              <div className="text-xs">{config.name}</div>
            </div>
          </div>
        </div>
      ))}
      {secrets.map((secret, index) => (
        <div key={index} className="inline-block">
          <div className="max-w-xs w-48 p-1 h-full border-2 rounded-md overflow-hidden ease-in-out">
            <div className="pod-drag flex justify-between space-x-4">
              <div className="text-xs">Secret</div>
              <div className="text-xs">{secret.name}</div>
            </div>
            <div className="">{`Type: ${secret.type}`}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BottomBar;
