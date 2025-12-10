import React from "react";

// prettier-ignore
const Button = ({ width = "w-[100%]", height="h-[50px]",radius = "rounded-[8px]" ,buttonText}) => {
  return (
    <button
      className={`${width} ${radius} font-[600]  text-[20px] ${height} text-white bg-[#f35f29] flex items-center justify-center transform hover:-translate-y-[3px]  transition duration-300 hover:bg-[#E65C2B]`}
    >
      {buttonText}
    </button>
  );
};

export default Button;