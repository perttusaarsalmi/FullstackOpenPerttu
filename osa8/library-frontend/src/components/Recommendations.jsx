import { useQuery } from "@apollo/client/react";
import { GET_USER, ALL_BOOKS } from "../queries";
import { useState } from "react";

const Recommendations = (props) => {
  const { data, loading, error } = useQuery(GET_USER);
  const {
    data: booksData,
    loading: booksLoading,
    error: booksError,
  } = useQuery(ALL_BOOKS);

  const [page, setPage] = useState("authors");

  if (!props.show) {
    return null;
  }

  if (loading || booksLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (booksError) {
    return <p>Error: {booksError.message}</p>;
  }

  const favoriteGenre = data?.me?.favoriteGenre;
  const books = booksData?.allBooks || [];
  const recommendedBooks = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h3>recommendations</h3>
      <div>
        books in your favourite{" "}
        <span style={{ fontWeight: "bold" }}>{favoriteGenre}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {recommendedBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
