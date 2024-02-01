import { useContext, useState } from "react";
import Node from "../node";
import TopBar from "../top-bar";
import ControlBar from "../control-bar";
import { KubeComponentsContext } from "../../contexts/kube-components.provider";
import BottomBar from "../bottom-bar";

const Playground = () => {
  const [activeDrags, setActiveDrags] = useState<number>(0);
  const { components } = useContext(KubeComponentsContext);

  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  const pgDragHandlers = { onStart, onStop };

  return (
    <>
      <ControlBar />
      <div className="flex flex-col h-full w-4/5">
        <div className="flex justify-end w-full">
          <TopBar />
        </div>
        <div className="relative h-full p-1">
          {Object.entries(components.nodes).map(([key, value], index) => (
            <Node
              key={index}
              pods={components.pods}
              podIds={value}
              title={key}
              dragHandlers={pgDragHandlers}
            />
          ))}
        </div>
        <BottomBar
          services={Object.values(components.services)}
          configs={Object.values(components.configs)}
          secrets={Object.values(components.secrets)}
        />
      </div>
    </>
  );
};

export default Playground;
