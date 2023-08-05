import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";

import "../assets/css/searchBar.css";

export default function AllComicsPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectPage, setSelectPage] = useState();

  const fetchData = async () => {
    try {
      let title = "";
      if (search) {
        title = `&title=${search}`;
      }
      const { data } = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/comics?page=${page}${title}`
      );
      setData(data);
      setSelectPage(Array.from(Array(Math.ceil(data.count / 100)).keys()));
      setIsLoading(false);
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
            label="Recherche par comics 📕 :"
            placeholder="ex : spider man, 100#, ..."
            page={page}
            setPage={setPage}
            selectPage={selectPage}
          />

          <Cards data={data} path={/comic/} />
        </>
      )}
    </>
  );
}
