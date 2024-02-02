import Draggable from "react-draggable";
import {
  PodType,
  PodSpec,
  KubeComponentsContext,
  ConfigItem,
  SecretItem,
} from "../../contexts";
import { useContext } from "react";
import ConfigMapWidget from "../config-map/config-map-widget";
import SecretWidget from "../secret/secret-widget";
import ServiceWidget from "../service/service-widget";

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

  const getDistinctRefs = (array: (ConfigItem | SecretItem)[]) => [
    ...new Set(array.map((item) => item.ref)),
  ];

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
            <ServiceWidget serviceSpec={components.services[pod.port]} />
          )}
          {getDistinctRefs(pod.configs).map((configRef, index) => (
            <ConfigMapWidget key={index} configRef={configRef} />
          ))}
          {getDistinctRefs(pod.secrets).map((secretRef, index) => (
            <SecretWidget key={index} secretRef={secretRef} />
          ))}
        </div>
      </div>
    </Draggable>
  );
};

export default Pod;
