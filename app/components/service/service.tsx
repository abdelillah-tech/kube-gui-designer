import { useContext } from "react";
import { ControlBarContext, ControlMode } from "../../contexts";
import { ServiceSpec } from "../shared/service-types";
import SmallCard from "../shared/components/small-card";

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
      <SmallCard label="Service" title={service.name}> 
        <div className="">{`Port: ${service.port}`}</div>
        <div className="">{`Target Port: ${service.targetPort}`}</div>
        <div className="">{`Protocol: ${service.protocol}`}</div>
      </SmallCard>
    </div>
  );
};
export default Service;
