import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "../assets/css/characterPage.css";

export default function BioCharacterPage() {
  const [comicData, setComicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const { thumbnail, comics, name, description } = location.state.data;
  const { characterId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/comics/${characterId}`
      );
      console.log(response.data.comics.length);
      setComicData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [characterId]);

  let picture = "";
  if (!thumbnail.path.match("image_not_available")) {
    picture = `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`;
  }

  return (
    <main className="bio-space">
      <h2>{name}</h2>
      <div className="wrapper">
        <div className="bio-card-left">
          <img src={picture} alt="" />
          <div className="bio-description">
            <h3>Description</h3>
            {description ? (
              <p className="bio-description">{description}</p>
            ) : (
              <p className="to-complete">Need to be completed ! </p>
            )}
            {comics.length > 0 && (
              <p>{`${name} apparaît dans ${comics.length} comic${
                comics.length > 1 ? "s" : ""
              } !`}</p>
            )}
          </div>
        </div>
        <div className="bio-card-right">
          <h3>Comics</h3>
          <div>
            {isLoading ? (
              <p>Downloading...</p>
            ) : comicData.comics.length === 0 ? (
              <div className="section-to-complete">
                <p>Pas de comics</p>
              </div>
            ) : (
              comicData.comics.map((comic) => {
                console.log("comic", comic);
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
        </div>
      </div>
    </main>
  );
}
