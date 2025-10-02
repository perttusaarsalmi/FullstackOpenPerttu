import { useEffect } from "react";
import { EDIT_AUTHOR, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import Notify from "./Notify";
import PropTypes from "prop-types";

export const UpdateAuthor = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(authors[0]?.name || "");
  const [error, setError] = useState("");
  const [birthyear, setBirthyear] = useState("");
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();
    editAuthor({
      variables: {
        name: selectedAuthor,
        setBornTo: Number(birthyear),
      },
    });
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
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
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
UpdateAuthor.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UpdateAuthor;
