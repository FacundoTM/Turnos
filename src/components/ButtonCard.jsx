const ButtonCard = ({ texto, ...props }) => {
  return (
    <>
      <button
        className="transition ease-in-out delay-150 duration-300 border border-white text-white  font-semibold text-sm antialiased px-4 py-2 rounded-md"
        {...props}
      >
        {texto}
      </button>
    </>
  );
};

export default ButtonCard;
