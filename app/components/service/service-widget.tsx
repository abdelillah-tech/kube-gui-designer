import { ServiceSpec } from "../../contexts";

interface IServiceWidget {
  serviceSpec: ServiceSpec;
}

const ServiceWidget = ({ serviceSpec }: IServiceWidget) => (
  <div className="flex justify-between space-x-4 p-1 border rounded-md border-black">
    <div className="text-xs">servive</div>
    <div className="text-xs">{serviceSpec.name}</div>
    <div className="text-xs">{serviceSpec.port}</div>
  </div>
);

export default ServiceWidget;
