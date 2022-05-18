import React from "react";

interface Props {
  firstName: string | undefined;
  lastName: string | undefined;
  age: number | undefined;
  phone: string | undefined;
  picture: string | undefined;
}

export const Card: React.FC<Props> = (props) => {
  return (
    <>
      <div className="flex flex-col border-4 rounded-lg justify-center h-40 w-40 mt-5 bg-gradient-to-b from-cyan-500 to-blue-700">
        <img className="basis-1/4 rounded-full h-20 m-auto -translate-y-8 shadow-2xl border-2" src={props.picture} alt={`${props.firstName}'s Profile Pic`} />
        <div className="basis-1/4 -translate-y-8 leading-none"><p className="text-md">{`${props.firstName} ${props.lastName}`}</p></div>
        <div className="basis-1/4 -translate-y-8 leading-normal"><p className="text-sm">{`Age: ${props.age}`}</p></div>
        <div className="basis-1/4 -translate-y-8 leading-normal"><p className="text-sm">{`Tel: ${props.phone}`}</p></div>
      </div>
    </>
  );
};
