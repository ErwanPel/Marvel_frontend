import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ComicsByCharacter({ characterId }) {
  const [comicData, setComicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/comics/${characterId}`
      );

      setComicData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <p>Downloading...</p>
  ) : (
    <div>
      {isLoading ? (
        <p>Downloading...</p>
      ) : comicData.comics.length === 0 ? (
        <div className="no-comics">
          <p className="to-complete">Pas de comics</p>
        </div>
      ) : (
        comicData.comics.map((comic) => {
          return (
            <Link
              key={comic._id}
              className="comic-bio-card"
              to={`/comic/${comic._id}`}
              state={{ data: comic }}
            >
              <img
                src={`${comic.thumbnail.path}/portrait_small.${comic.thumbnail.extension}`}
                alt=""
              />{" "}
              <p>{comic.title}</p>
            </Link>
          );
        })
      )}
    </div>
  );
}
