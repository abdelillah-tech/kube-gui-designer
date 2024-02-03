import { FieldArrayRenderProps } from "formik";
import AddRemoveController from "../add-remove-controller";
import SelectField from "./select-field";
import SimpleField from "./simple-field";
import { SecretItem } from "../../pod-types";
import { Secrets } from "../../secret-types";

interface IPodSecretField {
  index: number;
  secrets: Secrets;
  selected: SecretItem;
  arrayHelpers: FieldArrayRenderProps;
}

const PodSecretField = ({
  index,
  secrets,
  selected,
  arrayHelpers,
}: IPodSecretField) => (
  <div key={index} className="inline-block">
    <div
      key={index}
      className="flex justify-between items-center border rounded-md p-1"
    >
      <div className="flex flex-col space-y-1">
        <div>
          <SimpleField
            label="name"
            name={`secrets.${index}.name`}
            type="text"
          />
        </div>
        <div>
          <SelectField
            label="ref"
            name={`secrets.${index}.ref`}
            options={Object.keys(secrets)}
          />
        </div>
        <div>
          {selected.ref && (
            <SelectField
              label="key"
              name={`secrets.${index}.key`}
              options={secrets[selected.ref].secrets.map(
                (secret) => secret.name
              )}
            />
          )}
        </div>
      </div>
      <AddRemoveController index={index} arrayHelpers={arrayHelpers} />
    </div>
  </div>
);

export default PodSecretField;
