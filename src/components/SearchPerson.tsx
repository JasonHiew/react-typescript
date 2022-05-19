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
  inputSearchValue: string;
}

export const SearchPerson: React.FC<Props> = (props) => {
  return (
    <>
      {props.person
        .filter(
          (person: any) =>
            person.name.first
              .toLowerCase()
              .includes(props.inputSearchValue.toLowerCase()) && props.inputSearchValue
        )
        .map((person: any, idx: number) => (
          <Card
            key={`search-${idx}`}
            firstName={person.name.first}
            lastName={person.name.last}
            age={person.dob.age}
            phone={person.phone}
            picture={person.picture.medium}
          />
        ))}
    </>
  );
};

export default SearchPerson;