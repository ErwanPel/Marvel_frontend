import { useLocation } from "react-router-dom";

import "../assets/css/comicPage.css";

export default function ComicPage() {
  const location = useLocation();

  const { description, thumbnail, title, _id } = location.state.data;
  console.log(description, thumbnail, title, _id);

  let picture = "";
  if (!thumbnail.path.match("image_not_available")) {
    picture = `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`;
  }
  return (
    <main className="comic-page">
      {description ? (
        <>
          <h2>{title}</h2>
          <div className="comic-bloc">
            <div>
              <img src={picture} alt="" />
            </div>
            <p>{description}</p>
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
