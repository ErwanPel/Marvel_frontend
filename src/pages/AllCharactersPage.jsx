import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";

import "../assets/css/searchBar.css";

export default function CharactersPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      let name = "";
      if (search) {
        name = `&name=${search}`;
      }
      const { data } = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/characters?page=1${name}`
      );
      setData(data);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    console.log("useEffect characters activated");
    fetchData();
  }, [search]);

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        label="Recherche par personnages 🦸‍♂️ :"
      />
      <main>
        {isLoading ? (
          <p className="wrapper">Downloading ...</p>
        ) : (
          <Cards data={data} path="/" />
        )}
      </main>
    </>
  );
}
