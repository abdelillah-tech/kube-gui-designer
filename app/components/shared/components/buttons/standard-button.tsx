interface IResourceButton {
  text: string;
  handler: () => void;
}

const StandardButton = ({ text, handler }: IResourceButton) => {
  return (
    <button
      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-2 rounded-full"
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default StandardButton;
