import { createContext, useState } from "react";
import { ResourceType, ControlModeType, ControlMode } from ".";

const defaultControlMode = {
  controlMode: ControlMode.CreatePod,
  setControlMode: () => {},
};

export const ControlBarContext =
  createContext<ControlModeType>(defaultControlMode);

const ControlModeProvider = ({ children }) => {
  const [controlMode, setControlMode] = useState(ControlMode.CreatePod);
  return (
    <ControlBarContext.Provider value={{ controlMode, setControlMode }}>
      {children}
    </ControlBarContext.Provider>
  );
};

export default ControlModeProvider;
