import { useSelector, useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const style = {
    marginBottom: 10,
  }
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  return (
    <div style={style}>
      filter{' '}
      <input
        type="text"
        placeholder="Filter anecdotes"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default AnecdoteFilter
