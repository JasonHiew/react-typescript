import React from "react";
import "./Card.css";

export const Loading: React.FC = () => {
  return (
    <>
      <div className="container col-span-5 p-16">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
      </div>
    </>
  );
};
