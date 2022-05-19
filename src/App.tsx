import React, {
  useEffect,
  useState,
  useRef,
  useReducer,
  Suspense,
  useTransition,
  useDeferredValue,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import { Card } from "./components/Card";
import { Loading } from "./components/Loading";
import axios from "axios";
// import SearchPerson from "./components/SearchPerson";
// import { RenderAllPerson } from "./components/RenderAllPerson";

const RenderAllPerson = React.lazy(
  () => import("./components/RenderAllPerson")
);
const SearchPerson = React.lazy(() => import("./components/SearchPerson"));

type Person = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  dob: {
    age: number;
    date: string;
  };
  phone: string;
  picture: {
    medium: string;
  };
  age: number;
};

const App: React.FC = () => {
  const renderCount = useRef(0);
  const [loadedPages, setLoadedPage] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [seed, setSeed] = useState<string>("abc");
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [person, setPerson] = useState<Array<Person>>([]);

  const [isPending, startTransition] = useTransition(); // trying out useTransition
  const deferredSearchText = useDeferredValue(inputSearchValue);
  const deferredSeedText = useDeferredValue(seed);

  const [sum, dispatch] = useReducer(
    (state: number, action: { type: string; payload: number }) => {
      switch (action.type) {
        case "PREV_PAGE":
          return state - action.payload;
        case "NEXT_PAGE":
          return state + action.payload;
        default:
          return state - action.payload;
      }
    },
    page
  );

  let url = `https://randomuser.me/api/?page=${page}&results=${pageSize}&seed=${deferredSeedText}`;

  const getPerson = async () => {
    const { data } = await axios(url);
    setPerson([...person, ...data.results]);
  };

  const resetPerson = async () => {
    setPerson([]);
    getPerson();
    setPage(1);
    setLoadedPage(1);
    setInputSearchValue("");
  };

  useEffect(() => {
    getPerson();
  }, []);

  useEffect(() => {
    resetPerson();
    <RenderAllPerson person={person} page={page} pageSize={pageSize} />;
    console.log("Changed seed");
  }, [seed]);

  useEffect(() => {
    if (page > loadedPages) {
      setLoadedPage(page);
      getPerson();
    }
    <RenderAllPerson person={person} page={page} pageSize={pageSize} />;
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

  const handlePageSizeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPageSize(parseInt(e.target.value, 10));
  };

  const handlePageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPage(parseInt(e.target.value, 10));
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
        {/* <h1>{sum}</h1>
        <button onClick={() => dispatch({ type: "PREV_PAGE", payload: 1 })}>
          Prev
        </button>
        <button onClick={() => dispatch({ type: "NEXT_PAGE", payload: 1 })}>
          Next
        </button> */}
        <p className="underline text-cyan-500">{url}</p>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="block md:flex lg:flex mb-5">
          <label>Results Per Page: </label>
          <input
            type="number"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(e)}
            className="text-black text-center w-16 h-10 rounded-lg border-cyan-500 border-4 ml-5"
          />
        </div>
        <div className="block md:flex lg:flex mb-5">
          <label>Seed: </label>
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="text-black text-center w-16 h-10 rounded-lg border-cyan-500 border-4 ml-5"
          />
        </div>
        <div className="block md:flex lg:flex mb-5">
          <label className="mx-5">Search Name: </label>
          <input
            type="text"
            value={inputSearchValue}
            onChange={(e) => {
              startTransition(() => {
                setInputSearchValue(e.target.value);
              });
            }}
            className="text-black text-center h-10 rounded-lg border-cyan-500 border-4 ml-5"
          />
          <div className="inline-block align-middle mt-5 md:mt-0">
            <div className="inline-flex mr-3 md:ml-5">
              <label className="mr-3">Page:</label>
              <input
                type="number"
                value={page}
                onChange={(e) => handlePageChange(e)}
                className="text-black text-center w-16 h-10 rounded-lg border-cyan-500 border-4 ml-0"
              />
            </div>
            <div className="inline-flex">
              <button
                className="bg-emerald-500 w-10 text-center rounded-lg mr-3 inline-block align-middle"
                onClick={prevPage}
              >
                &lt;
              </button>
              <button
                disabled={isPending}
                className="bg-emerald-500 w-10 text-center rounded-lg inline-block align-middle"
                onClick={() => {
                  startTransition(() => {
                    nextPage();
                  });
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {/* Checks inputSearchValue from search box, if empty, display all. But if has text, filter matches */}
          <Suspense fallback={<Loading />}>
            {inputSearchValue ? (
              <SearchPerson
                person={person}
                page={page}
                pageSize={pageSize}
                inputSearchValue={deferredSearchText}
              />
            ) : (
              <RenderAllPerson
                person={person}
                page={page}
                pageSize={pageSize}
              />
            )}
          </Suspense>
        </div>
        {/* <pre className="mt-20 text-left text-xs">
          {JSON.stringify(person, null, 2)}
        </pre> */}
      </header>
    </div>
  );
};

export default App;
