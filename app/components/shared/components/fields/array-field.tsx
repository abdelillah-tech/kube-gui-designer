import { ErrorMessage, FieldArray } from "formik";
import { NameValue } from "../../types";
import { AddRemoveController, NameValueField, SmallButton } from "..";

interface IArrayField {
  items: NameValue[];
  name: string;
  label: string;
}

const ArrayField = ({ items, name, label }: IArrayField) => (
  <>
    <label className="font-bold text-gray-800">{`${label}:`}</label>
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div className="flex flex-col">
          {items && items.length > 0 ? (
            items.map((config, index) => (
              <div key={index} className="inline-block">
                <div className="flex justify-between items-center p-1 m-1">
                  <NameValueField index={index} prefix={name} />
                  <AddRemoveController
                    index={index}
                    arrayHelpers={arrayHelpers}
                    initInsetedValue={{ name: "", value: "" }}
                  />
                </div>
              </div>
            ))
          ) : (
            <SmallButton
              text="Add a config"
              handler={() => arrayHelpers.push({ name: "", value: "" })}
            />
          )}
        </div>
      )}
    />
  </>
);

export default ArrayField;
