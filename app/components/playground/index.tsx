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
      <aside className="w-1/5 h-full bg-orange-100 p-1">
        <ControlBar />
      </aside>
      <div className="flex flex-col h-full w-4/5">
        <div className="flex justify-between w-full p-1 bg-orange-100">
          <TopBar />
        </div>
        <div className="relative h-full p-1 bg-orange-50">
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
        <div className="flex overflow-x-auto h-1/6 space-x-1 p-1 bg-orange-100 border border-gray-800">
          <BottomBar
            services={Object.values(components.services)}
            configs={Object.values(components.configs)}
            secrets={Object.values(components.secrets)}
          />
        </div>
      </div>
    </>
  );
};

export default Playground;
