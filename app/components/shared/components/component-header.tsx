interface IComponentHeader {
  label: string;
  title?: string;
  customClass?: string;
}

const ComponentHeader = ({ label, title, customClass }: IComponentHeader) => {
  return (
    <div className={`${customClass} flex justify-between space-x-5 text-xs text-gray-800 font-semibold`}>
      <div>{label}</div>
      <div>{title}</div>
    </div>
  );
};

export default ComponentHeader;
