import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar({
  search,
  setSearch,
  label,
  placeholder,
  page,
  setPage,
  selectPage,
}) {
  return (
    <div className="sticky-bloc">
      <div className="search-bloc">
        <label htmlFor="search">{label}</label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder={placeholder}
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          autoComplete="on"
        />{" "}
      </div>
      <div className="select-bloc">
        {page > 1 && (
          <FontAwesomeIcon
            className="chevron"
            icon="angles-left"
            onClick={() => setPage(1)}
          />
        )}
        {page > 1 && (
          <FontAwesomeIcon
            className="chevron"
            icon="chevron-left"
            onClick={() => setPage(page - 1)}
          />
        )}
        <select
          name="page"
          id="page"
          onChange={(event) => setPage(event.target.value)}
          value={page}
        >
          {selectPage.map((element, index) => {
            return (
              <option key={element} value={index + 1}>{`Page ${
                index + 1
              } `}</option>
            );
          })}
        </select>
        {page < selectPage.length && (
          <FontAwesomeIcon
            className="chevron"
            icon="chevron-right"
            onClick={() => setPage(page + 1)}
          />
        )}
        {page < selectPage.length && (
          <FontAwesomeIcon
            className="chevron"
            icon="angles-right"
            onClick={() => setPage(selectPage.length)}
          />
        )}
      </div>
    </div>
  );
}
