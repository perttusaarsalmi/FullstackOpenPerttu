const Search = (props) => {
  return (
    <form>
      <div>
        find countries:{" "}
        <input
          value={props.searchWord}
          onChange={props.onSearchChange}
        />
      </div>
    </form>
  );
};

export default Search;