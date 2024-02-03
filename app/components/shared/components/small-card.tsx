import ComponentHeader from "./component-header";

interface ISmallCard {
  children?: any;
  label: string;
  title?: string;
  customClass?: string;
}

const SmallCard = ({ children, label, title, customClass }: ISmallCard) => (
  <div className="max-w-xs w-48 p-1 h-full rounded-md shadow-lg bg-yellow-50 overflow-hidden ease-in-out">
    <ComponentHeader label={label} title={title} customClass={customClass} />
    {children}
  </div>
);

export default SmallCard;