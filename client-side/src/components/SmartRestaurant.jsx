import React from "react";

const SmartRestaurant = ({ textSize = "text-[17px]" }) => {
  return (
    <div
      className={`${textSize} text-[#616161] flex items-center justify-center`}
    >
      Smart Restaurant Management
    </div>
  );
};

export default SmartRestaurant;