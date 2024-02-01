import Draggable from "react-draggable";
import { PodType, PodSpec, KubeComponentsContext } from "../../contexts";
import { useContext } from "react";

interface IPod {
  dragHandlers: {
    onStart: () => void;
    onStop: () => void;
  };
  pod: PodType;
  spec?: PodSpec;
}

const Pod = ({ dragHandlers, pod }: IPod) => {
  const { components } = useContext(KubeComponentsContext);

  return (
    <Draggable bounds="parent" handle=".pod-drag" {...dragHandlers}>
      <div className="p-1 w-max h-max border border-dashed rounded-md border-black ">
        <div className="pod-drag flex justify-between space-x-4">
          <div className="text-xs">namespace</div>
          <div className="text-xs">{pod.namespace}</div>
        </div>
        <div className="p-1 bg-white border rounded-md border-black">
          <div className="pod-drag flex justify-between space-x-4">
            <div className="text-xs">Pod</div>
            <div className="text-xs">{pod.podId}</div>
            <div className="text-xs">{`port: ${pod.port}`}</div>
          </div>
          {components.services[pod.port] && (
            <div className="flex justify-between space-x-4 p-1 border rounded-md border-black">
              <div className="text-xs">servive</div>
              <div className="text-xs">
                {components.services[pod.port].name}
              </div>
              <div className="text-xs">
                {components.services[pod.port].port}
              </div>
            </div>
          )}
          <div className="m-1 border rounded-md border-black">Secrets</div>
          <div className="m-1 border rounded-md border-black">Config map</div>
        </div>
      </div>
    </Draggable>
  );
};

export default Pod;
