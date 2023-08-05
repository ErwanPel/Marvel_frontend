import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";

import "../assets/css/searchBar.css";

export default function CharactersPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectPage, setSelectPage] = useState();

  const fetchData = async () => {
    try {
      let name = "";
      if (search) {
        name = `&name=${search}`;
      }
      const { data } = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/characters?page=${page}${name}`
      );
      setData(data);
      setSelectPage(Array.from(Array(Math.ceil(data.count / 100)).keys()));
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    console.log("useEffect characters activated");
    fetchData();
  }, [search, page]);

  return (
    <>
      {isLoading ? (
        <p className="wrapper">Downloading ...</p>
      ) : (
        <>
          <SearchBar
            search={search}
            setSearch={setSearch}
            label="Recherche par personnages 🦸‍♂️ :"
            placeholder="ex : spider man, iron man, ..."
            page={page}
            setPage={setPage}
            selectPage={selectPage}
          />
          <Cards data={data} path="/" />
        </>
      )}
    </>
  );
}
