export default function SearchBar({ search, setSearch, label }) {
  return (
    <div className="search-bloc">
      <label htmlFor="search">{label}</label>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Recherche"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />{" "}
    </div>
  );
}
