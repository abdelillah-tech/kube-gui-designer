import { useContext } from "react";
import { ControlBarContext, ControlMode, SecretSpec } from "../../contexts";

interface ISecret {
  secret: SecretSpec;
}

const Secret = ({ secret }: ISecret) => {
  const { setControl } = useContext(ControlBarContext);
  return (
    <div
      className="inline-block"
      onClick={() => setControl(ControlMode.UpdateSecret, secret)}
    >
      <div className="max-w-xs w-48 p-1 h-full border-2 rounded-md overflow-hidden ease-in-out">
        <div className="pod-drag flex justify-between space-x-4">
          <div className="text-xs">Secret</div>
          <div className="text-xs">{secret.name}</div>
        </div>
        <div className="">{`Type: ${secret.type}`}</div>
      </div>
    </div>
  );
};

export default Secret;
