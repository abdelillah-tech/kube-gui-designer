import { createContext, useState } from "react";
import { ControlMode } from ".";
import { SpecType } from "../components/shared/types";

export type ControlModeType = {
  controlMode: ControlMode;
  spec?: SpecType;
  setControl: (mode: ControlMode, spec?: SpecType) => void;
};

const defaultControlMode: ControlModeType = {
  controlMode: ControlMode.CreatePod,
  spec: undefined,
  setControl: () => {},
};

export const ControlBarContext =
  createContext<ControlModeType>(defaultControlMode);

const ControlModeProvider = ({ children }) => {
  const [controlMode, setControlMode] = useState(ControlMode.CreatePod);
  const [spec, setSpec] = useState<SpecType>();

  const setControl = (controlMode: ControlMode, spec?: SpecType) => {
    setControlMode(controlMode);
    setSpec(spec);
  };

  return (
    <ControlBarContext.Provider value={{ controlMode, spec, setControl }}>
      {children}
    </ControlBarContext.Provider>
  );
};

export default ControlModeProvider;
