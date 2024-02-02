import { useContext } from "react";
import { ControlBarContext, ControlMode, ServiceSpec } from "../../contexts";

interface IService {
  service: ServiceSpec;
}

const Service = ({ service }: IService) => {
  const { setControl } = useContext(ControlBarContext);
  return (
    <div
      className="inline-block"
      onClick={() => setControl(ControlMode.UpdateService, service)}
    >
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
  );
};
export default Service;
