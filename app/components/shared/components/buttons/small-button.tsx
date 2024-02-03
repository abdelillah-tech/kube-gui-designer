interface ISmallButton {
  text: string;
  handler: () => void;
}

const SmallButton = ({ text, handler }: ISmallButton) => {
  return (
    <button
      className="bg-orange-500 hover:bg-orange-700 text-white text-xs font-bold p-1 rounded-full"
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default SmallButton;
