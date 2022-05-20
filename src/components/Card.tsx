import React from "react";

interface Props {
  firstName: string | undefined;
  lastName: string | undefined;
  age: number | undefined;
  phone: string | undefined;
  picture: string | undefined;
  compact: boolean;
}

export const Card: React.FC<Props> = (props) => {
  return props.compact ? (
    <div className="grid grid-rows-3 grid-cols-10 grid-flow-col gap-1 min-h-0 min-w-0 border-4 rounded-lg justify-center h-20 w-40 mt-4 bg-gradient-to-b from-cyan-500 to-blue-700">
      <img
        height={40}
        width={40}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className="basis-1/4 rounded-full h-10 my-auto mx-1 shadow-2xl border-2 row-span-3 col-span-3"
        src={props.picture}
        alt={`${props.firstName}'s Profile Pic`}
      />
      <div className="basis-1/4 leading-none col-span-7 overflow-hidden">
        <p className="text-sm font-bold truncate hover:text-clip hover:z-40 text-[0.9rem]">{`${props.firstName} ${props.lastName}`}</p>
      </div>
      <div className="basis-1/4 leading-normal col-span-7 overflow-hidden">
        <p className="text-sm truncate hover:text-clip hover:z-40 text-[0.9rem]">{`Age: ${props.age}`}</p>
      </div>
      <div className="basis-1/4 leading-normal col-span-7 overflow-hidden">
        <p className="text-xs truncate hover:text-clip hover:z-40 text-[0.9rem]">{`Tel: ${props.phone}`}</p>
      </div>
    </div>
  ) : (
    <div className="grid grid-rows-6 grid-flow-row gap-1 min-h-0 min-w-0 border-4 rounded-lg justify-center h-40 w-40 mt-7 bg-gradient-to-b from-cyan-500 to-blue-700">
      <img
        height={80}
        width={80}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className="basis-1/4 rounded-full h-20 m-auto shadow-2xl border-2 row-span-2 -translate-y-9"
        src={props.picture}
        alt={`${props.firstName}'s Profile Pic`}
      />
      <div className="basis-1/4 leading-none row-span-2">
        <p className="text-md hover:text-clip">{`${props.firstName} ${props.lastName}`}</p>
      </div>
      <div className="basis-1/4 leading-normal row-span-1">
        <p className="text-sm hover:text-clip">{`Age: ${props.age}`}</p>
      </div>
      <div className="basis-1/4 leading-normal row-span-1">
        <p className="text-sm hover:text-clip">{`Tel: ${props.phone}`}</p>
      </div>
    </div>
  );
};
