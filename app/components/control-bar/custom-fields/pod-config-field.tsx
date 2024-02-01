import { FieldArrayRenderProps } from "formik";
import { ConfigItem, Configs } from "../../../contexts";
import AddRemoveController from "./add-remove-controller";
import SelectField from "./select-field";
import SimpleField from "./simple-field";

interface IPodConfigField {
  index: number;
  configs: Configs;
  selected: ConfigItem;
  arrayHelpers: FieldArrayRenderProps;
}

const PodConfigField = ({
  index,
  configs,
  selected,
  arrayHelpers,
}: IPodConfigField) => (
  <div key={index} className="inline-block">
    <div
      key={index}
      className="flex justify-between items-center border rounded-md p-1"
    >
      <div className="flex flex-col space-y-1">
        <div>
          <SimpleField
            label="name"
            name={`configs.${index}.name`}
            type="text"
          />
        </div>
        <div>
          <SelectField
            label="ref"
            name={`configs.${index}.ref`}
            options={Object.keys(configs)}
          />
        </div>
        <div>
          {selected.ref && (
            <SelectField
              label="key"
              name={`configs.${index}.key`}
              options={configs[selected.ref].configs.map(
                (config) => config.name
              )}
            />
          )}
        </div>
      </div>
      <AddRemoveController index={index} arrayHelpers={arrayHelpers} />
    </div>
  </div>
);

export default PodConfigField;
