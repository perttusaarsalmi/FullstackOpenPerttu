const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with:{' '}
        <input
          value={props.searchWord}
          onChange={(e) => props.setSearchWord(e.target.value)}
        />
      </div>
    </form>
  )
}

export default Filter
