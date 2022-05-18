import React, { useEffect, useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Card } from "./components/Card";
import axios from "axios";

// type Person = {
//   name: {
//     title: string;
//     first: string;
//     last: string;
//   };
//   dob: {
//     age: number;
//     date: string;
//   };
//   // address?: {
//   //   country?: string;
//   //   city?: string;
//   // };
// };

const App: React.FC = () => {
  const renderCount = useRef(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [seed, setSeed] = useState<string>("abc");
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [person, setPerson] = useState<
    Array<{
      name: {
        title: "";
        first: "";
        last: "";
      };
      dob: {
        age: 0;
        date: "";
      };
      picture: {
        medium: "";
      };
      age: 0;
    }>
  >([]);

  let url = `https://randomuser.me/api/?page=${page}&results=${pageSize}&seed=${seed}`;

  const getPerson = async () => {
    const { data } = await axios(url);
    setPerson([...person, ...data.results]);
  };

  const resetPerson = async () => {
    setPerson([]);
  };

  useEffect(() => {
    getPerson();
  }, []);
  
  useEffect(() => {
    resetPerson(); 
    getPerson();
    <RenderAllPersonComp />;
    console.log("Changed seed");
  }, [seed]);

  useEffect(() => {
    getPerson();
    <RenderAllPersonComp />;
    console.log(url);
    console.log("Changed page");
  }, [page]);


  useEffect(() => {
    renderCount.current += 1;
  });

  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const SearchPersonComp = () => {
    if(person.length === 0) return <div>Loading...</div>;
    return (
      <>
        {person
          .filter(
            (person: any) =>
              person.name.first
                .toLowerCase()
                .includes(inputSearchValue.toLowerCase()) && inputSearchValue
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

  const RenderAllPersonComp = () => {
    if(person.length === 0) return <div>Loading...</div>;
    return (
      <>
        {person
          .slice((page - 1) * pageSize, page * pageSize)
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

  const handlePageSizeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPageSize(parseInt(e.target.value, 10));
  };

  return (
    <div className="App">
      <p className="text-red-200 font-light text-sm decoration-solid">
        Render Count: {renderCount.current}
      </p>
      <header className="App-header">
        <p className="mt-5">
          Randomuser API Testing + Learning Typescript / Pure React
        </p>
        <p className="underline text-cyan-500">{url}</p>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="block md:flex lg:flex my-5">
          <label>Results Per Page: </label>
          <input
            type="number"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(e)}
            className="text-black text-center w-16 h-10 rounded-lg border-cyan-500 border-4 ml-5"
          />
        </div>
        <div className="block md:flex lg:flex my-5">
          <label>Seed: </label>
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="text-black text-center w-16 h-10 rounded-lg border-cyan-500 border-4 ml-5"
          />
        </div>
        <div className="block md:flex lg:flex my-5">
          <label className="mx-5">Search Name: </label>
          <input
            type="text"
            value={inputSearchValue}
            onChange={(e) => setInputSearchValue(e.target.value)}
            className="text-black text-center h-10 rounded-lg border-cyan-500 border-4 ml-5"
          />
          <div className="inline-block align-middle mt-5 md:mt-0">
            <label className="mx-5">Page: {page}</label>
            <button
              className="bg-emerald-500 w-10 text-center rounded-full mr-3 inline-block align-middle"
              onClick={prevPage}
            >
              &lt;
            </button>
            <button
              className="bg-emerald-500 w-10 text-center rounded-full inline-block align-middle"
              onClick={nextPage}
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {/* Checks inputSearchValue from search box, if empty, display all. But if has text, filter matches */}
          {inputSearchValue ? <SearchPersonComp /> : <RenderAllPersonComp />}
        </div>
        {/* <pre className="mt-20 text-left text-xs">
          {JSON.stringify(person, null, 2)}
        </pre> */}
      </header>
    </div>
  );
};

export default App;
