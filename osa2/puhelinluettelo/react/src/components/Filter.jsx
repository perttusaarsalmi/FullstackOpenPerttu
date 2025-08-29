const Filter = (props) => {
  return (
    <form>
      <div>
        filter sown with:{" "}
        <input
          value={props.searchWord}
          onChange={(e) => props.setSearchWord(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Filter;
