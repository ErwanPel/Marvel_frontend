import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";
import Cookies from "js-cookie";

import "../assets/css/searchBar.css";

export default function AllComicsPage({ loginModal, signModal }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectPage, setSelectPage] = useState();
  const [cookiesComics, setCookiesComics] = useState(
    JSON.parse(Cookies.get("comics")) || []
  );

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
  }, [search, page, cookiesComics]);

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
            loginModal={loginModal}
            signModal={signModal}
          />

          <Cards
            data={data}
            cookiesComics={cookiesComics}
            setCookiesComics={setCookiesComics}
            loginModal={loginModal}
            signModal={signModal}
            path={/comic/}
            cookiesSort={cookiesComics}
          />
        </>
      )}
    </>
  );
}
