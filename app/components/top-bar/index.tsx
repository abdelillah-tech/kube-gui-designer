import { useContext, useState } from "react";
import { ControlBarContext, ControlMode, ResourceType } from "../../contexts";
import ResultModal from "../result-modal";

const TopBar = () => {
  const { setControl } = useContext(ControlBarContext);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (type: ResourceType) => {
    switch (type) {
      case ResourceType.Pod:
        setControl(ControlMode.CreatePod);
        break;
      case ResourceType.Secret:
        setControl(ControlMode.CreateSecret);
        break;
      case ResourceType.ConfigMap:
        setControl(ControlMode.CreateConfigMap);
        break;
      case ResourceType.Service:
        setControl(ControlMode.CreateService);
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
    <>
      {showModal && <ResultModal />}
      <div className="flex justify-between border-b-2 w-full p-1">
        <div className="flex justify-between space-x-1">
          <ResourceButton text="Add Pod" type={ResourceType.Pod} />
          <ResourceButton text="Add Service" type={ResourceType.Service} />
          <ResourceButton text="Add ConfigMap" type={ResourceType.ConfigMap} />
          <ResourceButton text="Add Secrets" type={ResourceType.Secret} />
        </div>
        <div>
          <ResultModal />
        </div>
      </div>
    </>
  );
};

export default TopBar;
