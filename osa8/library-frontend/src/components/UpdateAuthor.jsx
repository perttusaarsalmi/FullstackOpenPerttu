import { useEffect } from "react";
import { EDIT_AUTHOR, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import Notify from "./Notify";

export const UpdateAuthor = () => {
  const [error, setError] = useState("");
  const [author, setAuthor] = useState("");
  const [birthyear, setBirthyear] = useState("");
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();
    editAuthor({
      variables: {
        name: author,
        setBornTo: Number(birthyear),
      },
    });
    setAuthor("");
    setBirthyear("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("author not found");
    }
  }, [result.data]);

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          birthyear
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <Notify errorMessage={error} />

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default UpdateAuthor;
