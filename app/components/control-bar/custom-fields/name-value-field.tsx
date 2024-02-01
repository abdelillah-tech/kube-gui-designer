import SimpleField from "./simple-field";

interface INameValueField {
  index: number;
  prefix: string;
}

const NameValueField = ({ index, prefix }: INameValueField) => (
  <div className="flex flex-col space-y-1">
    <div>
      <SimpleField label="name" name={`${prefix}.${index}.name`} type="text" />
    </div>
    <div>
      <SimpleField
        label="value"
        name={`${prefix}.${index}.value`}
        type="text"
      />
    </div>
  </div>
);

export default NameValueField;
