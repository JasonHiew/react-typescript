import React from "react";
import { Card } from "./Card";

interface Props {
  person: {
    name: {
      first: string;
      last: string;
    };
    dob: {
      age: number;
    };
    phone: string;
    picture: {
      medium: string;
    };
  }[];
  page: number;
  pageSize: number;
}

export const RenderAllPerson: React.FC<Props> = (props) => {
  return (
    <>
      {props.person
        .slice((props.page - 1) * props.pageSize, props.page * props.pageSize)
        .map((person: any, idx: number) => (
          <Card
            key={`${idx}`}
            firstName={person.name.first || ""}
            lastName={person.name.last}
            age={person.dob.age}
            phone={person.phone}
            picture={person.picture.medium}
          />
        ))}
    </>
  );
};

export default RenderAllPerson;