import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Add this line

  useEffect(() => {
    const savedToken = localStorage.getItem("library-user-token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommendations")}>
            recommended
          </button>
        )}
        <button onClick={() => setPage("login")}>
          {token ? "logout" : "login"}
        </button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommendations"}></Recommendations>

      <Login
        show={page === "login"}
        token={token}
        setToken={setToken}
        errorMessage={errorMessage}
        setError={setErrorMessage}
      />
    </div>
  );
};

export default App;
