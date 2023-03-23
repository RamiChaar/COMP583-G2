function SearchBar ({searchKeyword, onChange}) {
    return (
      <input 
        className='searchInput'
        value={searchKeyword}
        placeholder={"search"}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  
  export default SearchBar;