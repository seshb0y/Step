import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./components/Counter";
// import axios from "axios";
import { Loading } from "./components/Loading";
import { useRequest } from "./hooks/useRequest";

function App() {
  const [isVisible, setVisible] = useState(false);
  const [page, setPage] = useState(1);

  const BASE_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=1`;

  const { posts, isLoading, error } = useRequest(BASE_URL);
  const toggle = () => {
    setVisible((prev) => !prev);
  };

  const next = () => {
    setPage((prev) => (prev += 1));
  };
  const back = () => {
    if (page > 0) {
      setPage((prev) => (prev -= 1));
    }
  };

  return (
    <>
      {isVisible ? (
        <div>
          {error ? <h1>{error}</h1> : <Counter posts={posts} />}
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <button onClick={back}>Back</button>
              <button onClick={next}>Next</button>
            </>
          )}
        </div>
      ) : (
        <button onClick={toggle}>Load</button>
      )}
    </>
  );
}

export default App;
