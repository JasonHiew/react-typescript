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
// import { Card } from "./components/Card";
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
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [compact, setCompact] = useState(false);

  const [isPending, startTransition] = useTransition(); // trying out useTransition
  const deferredSearchText = useDeferredValue(inputSearchValue);
  const deferredPageText = useDeferredValue(page);
  const deferredSeedText = useDeferredValue(seed);
  const deferredPageSizeText = useDeferredValue(pageSize);

  const [sum, dispatch] = useReducer(
    // trying out useReducer
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
    setLoading(true);
    const { data } = await axios(url);
    setPerson([...person, ...data.results]);
    setLoading(false);
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
    setTimeout(() => {
      setInitialLoad(false);
    }, 2000);
  }, []);

  useEffect(() => {
    resetPerson();
    <RenderAllPerson
      person={person}
      page={page}
      pageSize={pageSize}
      compact={compact}
    />;
    console.log("Changed seed");
  }, [deferredSeedText]);

  useEffect(() => {
    resetPerson();
    <RenderAllPerson
      person={person}
      page={page}
      pageSize={pageSize}
      compact={compact}
    />;
    console.log("Changed page size");
  }, [deferredPageSizeText]);

  useEffect(() => {
    if (page > loadedPages) {
      setLoadedPage(page);
      getPerson();
    }
    <RenderAllPerson
      person={person}
      page={page}
      pageSize={pageSize}
      compact={compact}
    />;
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
        <div className="text-5xl font-extrabold px-12 mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Randomuser API Testing + Typescript + Tailwind CSS + React <span className="inline-flex align-middle"><img src={logo} className="App-logo h-5" alt="logo" /></span>
          </span>
        </div>
      </header>
      <div className="App-body">
        <a className="underline text-cyan-500" href={url}>
          {url}
        </a>
        <div className="flex mt-5">
          <div className="block md:flex lg:flex mb-5">
            <label>Results Per Page: </label>
            <input
              type="number"
              value={pageSize}
              min="1"
              onChange={(e) => handlePageSizeChange(e)}
              className="text-black text-center w-16 h-10 rounded-lg border-cyan-500 border-4 ml-5"
              disabled={initialLoad ? true : false}
            />
          </div>
          <div className="block md:flex lg:flex mb-5 ml-5">
            <label>Seed: </label>
            <input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              className="text-black text-center w-16 h-10 rounded-lg border-cyan-500 border-4 ml-5"
              disabled={initialLoad ? true : false}
            />
          </div>
          <label className="flex items-center select-none cursor-pointer mb-5 ml-5">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                onChange={(e) => {
                  setCompact(e.target.checked);
                }}
                disabled={initialLoad ? true : false}
              />
              <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
            </div>
            <div className="ml-3">Compact View</div>
          </label>
        </div>
        <div className="block md:flex lg:flex mb-5">
          <label className="mx-5">Search Name: </label>
          <input
            type="text"
            value={inputSearchValue}
            onChange={(e) => setInputSearchValue(e.target.value)}
            className="text-black text-center h-10 rounded-lg border-cyan-500 border-4 ml-5"
            disabled={initialLoad ? true : false}
          />
          <div className="inline-block align-middle mt-5 md:mt-0">
            <div className="inline-flex mr-3 md:ml-5">
              <label className="mr-3">Page:</label>
              <input
                type="number"
                value={page}
                min="1"
                max={loadedPages}
                onChange={(e) => handlePageChange(e)}
                className="text-black text-center w-16 h-10 rounded-lg border-cyan-500 border-4 ml-0"
                disabled={initialLoad ? true : loading}
              />
            </div>
            <div className="inline-flex">
              <button
                className="bg-emerald-500 w-10 text-center rounded-lg mr-3 inline-block align-middle disabled:opacity-75"
                onClick={prevPage}
                disabled={initialLoad ? true : loading}
              >
                &lt;
              </button>
              <button
                className="bg-emerald-500 w-10 text-center rounded-lg inline-block align-middle disabled:opacity-75"
                onClick={nextPage}
                disabled={initialLoad ? true : loading}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {initialLoad ? (
            <Loading />
          ) : (
            <>
              {/* Checks inputSearchValue from search box, if empty, display all. But if has text, filter matches */}

              {loading ? (
                <Loading />
              ) : deferredSearchText ? (
                <SearchPerson
                  person={person}
                  page={page}
                  pageSize={pageSize}
                  inputSearchValue={deferredSearchText}
                  compact={compact}
                />
              ) : (
                <RenderAllPerson
                  person={person}
                  page={page}
                  pageSize={pageSize}
                  compact={compact}
                />
              )}
            </>
          )}
        </div>
        {/* <h1>{sum}</h1>
        <button onClick={() => dispatch({ type: "PREV_PAGE", payload: 1 })}>
          Prev
        </button>
        <button onClick={() => dispatch({ type: "NEXT_PAGE", payload: 1 })}>
          Next
        </button> */}
        {/* <pre className="mt-20 text-left text-xs">
          {JSON.stringify(person, null, 2)}
        </pre> */}
      </div>
    </div>
  );
};

export default App;
