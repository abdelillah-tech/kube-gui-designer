import Draggable from "react-draggable";
import { useState } from "react";
import Pod from "../pod";
import { Pods } from "../shared/pod-types";
import ComponentHeader from "../shared/components/component-header";

interface INode {
  dragHandlers: {
    onStart: () => void;
    onStop: () => void;
  };
  title: string;
  pods: Pods;
  podIds: string[];
}

const Node = ({ dragHandlers, title, pods, podIds }: INode) => {
  const [activeDrags, setActiveDrags] = useState<number>(0);

  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  const nodeDragHandlers = { onStart, onStop };

  return (
    <Draggable bounds="parent" handle=".node-drag" {...dragHandlers}>
      <div className="flex flex-col p-1 w-96 h-max bg-amber-50 rounded-md shadow-lg">
        <ComponentHeader label="Node" title={title} customClass="node-drag" />
        <div className="relative flex flex-wrap aspect-[4/3]">
          {podIds.map(
            (podId, index) =>
              pods[podId] && (
                <Pod
                  key={index}
                  pod={pods[podId]}
                  dragHandlers={nodeDragHandlers}
                />
              )
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default Node;
