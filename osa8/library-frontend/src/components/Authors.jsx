import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../queries";
import UpdateAuthor from "./UpdateAuthor";

const Authors = (props) => {
  const { data, loading, error } = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const authors = data?.allAuthors || [];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateAuthor></UpdateAuthor>
    </div>
  );
};

export default Authors;
