import { useContext } from "react";
import { ControlBarContext, ResourceType } from "../../contexts";

const TopBar = () => {
  const { setControlMode } = useContext(ControlBarContext);

  const handleClick = (type: ResourceType) => {
    switch (type) {
      case ResourceType.Pod:
        setControlMode(ResourceType.Pod);
        break;
      case ResourceType.Secret:
        setControlMode(ResourceType.Secret);
        break;
      case ResourceType.ConfigMap:
        setControlMode(ResourceType.ConfigMap);
        break;
      case ResourceType.Service:
        setControlMode(ResourceType.Service);
        break;
    }
  };

  const ResourceButton = ({
    text,
    type,
  }: {
    text: string;
    type: ResourceType;
  }) => {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md"
        onClick={() => handleClick(type)}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="flex justify-between border-b-2 w-full p-1">
      <div className="flex justify-between space-x-1">
        <ResourceButton text="Add Pod" type={ResourceType.Pod} />
        <ResourceButton text="Add Service" type={ResourceType.Service} />
        <ResourceButton text="Add ConfigMap" type={ResourceType.ConfigMap} />
        <ResourceButton text="Add Secrets" type={ResourceType.Secret} />
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          generate
        </button>
      </div>
    </div>
  );
};

export default TopBar;
