import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "../assets/css/comicPage.css";

export default function ComicPage() {
  const [comicData, setComicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { comicId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/comic/${comicId}`
      );
      setComicData(response.data);
      console.log(comicData);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  let picture = "";

  useEffect(() => {
    if (location.state) {
      console.log("if");
      setComicData(location.state.data);
      setIsLoading(false);
    } else {
      console.log("else");
      fetchData();
    }
  }, []);

  return isLoading ? (
    <p>Downloading...</p>
  ) : (
    <main className="comic-page">
      {comicData.description ? (
        <>
          <h2>{comicData.title}</h2>

          <div className="comic-bloc">
            {!comicData.thumbnail.path.match("image_not_available") && (
              <div>
                <img
                  src={`${comicData.thumbnail.path}/portrait_uncanny.${comicData.thumbnail.extension}`}
                  alt=""
                />
              </div>
            )}
            <p>{comicData.description}</p>
          </div>
        </>
      ) : (
        <div className="section-to-complete">
          <p>This section need to be completed ! </p>
          <p>Sorry 🦹‍♂️</p>
        </div>
      )}
    </main>
  );
}
//
