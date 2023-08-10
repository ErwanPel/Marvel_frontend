import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";
import Cookies from "js-cookie";

import "../assets/css/searchBar.css";

export default function AllComicsPage({
  loginModal,
  signModal,
  token,
  cookiesComics,
  setCookiesComics,
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectPage, setSelectPage] = useState();

  const fetchFav = async () => {
    try {
      const response = await axios.get(
        "https://site--marvel-backend--fwddjdqr85yq.code.run/favorites",
        { headers: { authorization: `Bearer ${token}` } }
      );

      console.log("get fav", response.data.comics);
      if (response.data.comics !== undefined) {
        setCookiesComics(response.data.comics);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchFav();
  }, [token]);

  // useEffect(() => {
  //   if (Cookies.get("comics")) {
  //     setCookiesComics(JSON.parse(Cookies.get("comics")));
  //     if (JSON.parse(Cookies.get("comics")).length === 0) {
  //       Cookies.remove("comics");
  //     }
  //   }
  // }, [Cookies.get("comics")]);

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
            token={token}
          />
        </>
      )}
    </>
  );
}
