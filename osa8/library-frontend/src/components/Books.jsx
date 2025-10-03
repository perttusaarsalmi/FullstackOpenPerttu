import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const { data, loading, error } = useQuery(ALL_BOOKS);
  const [genreFilter, setGenreFilter] = useState(null);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const books = data?.allBooks || [];

  const genreMap = {};
  books.forEach((book) => {
    if (Array.isArray(book.genres)) {
      book.genres.forEach((g) => {
        if (g) genreMap[g] = true;
      });
    }
  });
  const genreList = Object.keys(genreMap);

  // Filter books if a genre is selected
  const visibleBooks = genreFilter
    ? books.filter((b) => b.genres.includes(genreFilter))
    : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {visibleBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <span>Genres: </span>
        <button
          style={{ fontWeight: !genreFilter ? "bold" : "normal" }}
          onClick={() => setGenreFilter(null)}
        >
          all
        </button>
        {genreList.map((g) => (
          <button
            key={g}
            style={{ fontWeight: genreFilter === g ? "bold" : "normal" }}
            onClick={() => setGenreFilter(g)}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
