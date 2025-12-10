import React from "react";

const Logo = ({ logoColor = "text-prim", logoSize = "text-[45px]" }) => {
  return (
    <div
      className={` ${logoSize} ${logoColor} font-logofont text-center m-[20px]`}
    >
      Yumify
    </div>
  );
};

export default Logo;