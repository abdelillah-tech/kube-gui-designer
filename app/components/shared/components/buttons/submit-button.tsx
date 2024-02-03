interface ISubmitButton {
    text: string;
  }
  
  const SubmitButton = ({ text }: ISubmitButton) => {
    return (
      <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md w-full"
      >
        {text}
      </button>
    );
  };
  
  export default SubmitButton;
  