interface ISimpleStaticField {
  label: string;
  value: string;
}

const SimpleStaticField = ({ label, value }: ISimpleStaticField) => (
  <>
    <label className="font-bold text-sm text-gray-800">{`${label}:`}</label>
    <div className="border bg-white rounded-md p-1">{value}</div>
  </>
);

export default SimpleStaticField;
