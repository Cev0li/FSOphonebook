const Filter = ({handleFilterChange, filter}) => {
    return (
        <div>
            <h2>Filter</h2>
            <form>
                <input
                    onChange={handleFilterChange}
                    value={filter}
                />
            </form>
        </div>
    )
}

export default Filter