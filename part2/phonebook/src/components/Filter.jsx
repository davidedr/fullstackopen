const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <p>filter shown with<input value={newFilter} onChange={handleFilterChange}></input></p>
  )
}

export default Filter;