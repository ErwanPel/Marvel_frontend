import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SearchBar({
  search,
  setSearch,
  label,
  placeholder,
  page,
  setPage,
  selectPage,
  loginModal,
  signModal,
  arrayAutocomplete,
  autocompleteList,
  setAutocompleteList,
}) {
  const [hasFocus, setFocus] = useState(false);

  const getItem = (item) => {
    setSearch(() => item);
    setAutocompleteList(false);
  };

  return (
    <div
      className={
        loginModal || signModal
          ? "search-page-bloc"
          : "search-page-bloc sticky-bloc"
      }
      onClick={() => setAutocompleteList(false)}
    >
      <div className="search-bloc">
        <label htmlFor="search">{label}</label>
        <div className="autocomplete-bloc">
          <input
            type="text"
            name="search"
            id="search"
            placeholder={placeholder}
            onChange={(event) => {
              setAutocompleteList(true);
              setSearch(event.target.value);
              setPage(1);
            }}
            value={search}
          />
          {autocompleteList && (
            <div className="autocomplete-list">
              {arrayAutocomplete.map((item, index) => {
                let regex = new RegExp(search, "i");

                if (search.length > 0) {
                  if (item.match(regex)) {
                    return (
                      <div
                        tabIndex={0}
                        className="item"
                        key={index}
                        onClick={() => getItem(item)}
                        onFocus={() => setFocus(() => true)}
                        onBlur={() => setFocus(() => false)}
                      >
                        {item}
                      </div>
                    );
                  }
                }
              })}
            </div>
          )}
        </div>
      </div>
      <div className="select-bloc">
        <FontAwesomeIcon
          className={page > 1 ? "chevron" : "unvisible"}
          icon="angles-left"
          onClick={() => setPage(1)}
        />
        <FontAwesomeIcon
          className={page > 1 ? "chevron" : "unvisible"}
          icon="chevron-left"
          onClick={() => setPage(page - 1)}
        />
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

        <FontAwesomeIcon
          className={page < selectPage.length ? "chevron" : "unvisible"}
          icon="chevron-right"
          onClick={() => setPage(page + 1)}
        />

        <FontAwesomeIcon
          className={page < selectPage.length ? "chevron" : "unvisible"}
          icon="angles-right"
          onClick={() => setPage(selectPage.length)}
        />
      </div>
    </div>
  );
}
