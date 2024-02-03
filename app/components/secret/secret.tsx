import { useContext } from "react";
import { ControlBarContext, ControlMode } from "../../contexts";
import { SecretSpec } from "../shared/secret-types";
import SmallCard from "../shared/components/small-card";

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
      <SmallCard label="Secret" title={secret.name}>
        <div>{`Type: ${secret.type}`}</div>
      </SmallCard>
    </div>
  );
};

export default Secret;
