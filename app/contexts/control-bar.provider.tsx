import { createContext, useState } from "react";
import { ResourceType, ControlModeType } from ".";

const defaultControlMode = {
  controlMode: ResourceType.Pod,
  setControlMode: () => {},
};

export const ControlBarContext =
  createContext<ControlModeType>(defaultControlMode);

const ControlModeProvider = ({ children }) => {
  const [controlMode, setControlMode] = useState(ResourceType.Pod);
  return (
    <ControlBarContext.Provider value={{ controlMode, setControlMode }}>
      {children}
    </ControlBarContext.Provider>
  );
};

export default ControlModeProvider;
