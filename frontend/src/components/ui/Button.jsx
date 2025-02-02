const Button = ({ children, onClick, className = "", variant = "primary" }) => {
    const baseClasses = "font-bold py-2 px-4 rounded transition duration-300 ease-in-out";
    const variantClasses = {
      primary: "bg-blue-500 hover:bg-blue-600 text-white",
      secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
      danger: "bg-red-500 hover:bg-red-600 text-white",
      wallet: "bg-purple-500 hover:bg-purple-600 text-white",
    };
  
    return (
      <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {children}
      </button>
    );
  };
  
  export default Button;
  