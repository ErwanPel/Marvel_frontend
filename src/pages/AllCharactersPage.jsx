import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";
// import Cookies from "js-cookie";

import "../assets/css/searchBar.css";

export default function CharactersPage({
  loginModal,
  signModal,
  token,
  cookiesChar,
  setCookiesChar,
  setLoginModal,
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

      if (response.data.characters !== undefined) {
        setCookiesChar(response.data.characters);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchFav();
  }, [token]);

  // useEffect(() => {
  //   if (Cookies.get("characters")) {
  //     setCookiesChar(JSON.parse(Cookies.get("characters")));
  //     if (JSON.parse(Cookies.get("characters")).length === 0) {
  //       Cookies.remove("characters");
  //     }
  //   }
  // }, [Cookies.get("characters")]);

  let array = [];

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
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, page]);

  return (
    <>
      {isLoading ? (
        <p className="wrapper">Downloading ...</p>
      ) : (
        <>
          {data.results.map((item) => {
            array.push(item.name.split("(")[0].trim());
            let sortArray = new Set(array);
            array = Array.from(sortArray);
          })}
          <SearchBar
            search={search}
            setSearch={setSearch}
            label="Recherche par personnages 🦸‍♂️ :"
            placeholder="ex : spider-man, iron man, ..."
            page={page}
            setPage={setPage}
            selectPage={selectPage}
            loginModal={loginModal}
            signModal={signModal}
            array={array}
          />
          <Cards
            data={data}
            cookiesChar={cookiesChar}
            setCookiesChar={setCookiesChar}
            loginModal={loginModal}
            setLoginModal={setLoginModal}
            signModal={signModal}
            path="/"
            cookiesSort={cookiesChar}
            token={token}
          />
        </>
      )}
    </>
  );
}
