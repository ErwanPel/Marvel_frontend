import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";

import "../assets/css/searchBar.css";

export default function AllComicsPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      let title = "";
      if (search) {
        title = `&title=${search}`;
      }
      const { data } = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/comics?page=1${title}`
      );
      setData(data);
      setIsLoading(false);
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
      {" "}
      <SearchBar
        search={search}
        setSearch={setSearch}
        label="Recherche par comics 📕 :"
      />
      <main>
        {isLoading ? (
          <p className="wrapper">Downloading ...</p>
        ) : (
          <Cards data={data} path={/comic/} />
        )}
      </main>
    </>
  );
}
