import { useState, useEffect } from "react";
import { API_URL } from "../../../api/api";

export const FilmItem = ({ filmUrl }) => {
  const [film, setFilm] = useState("");
  const [isFilmLoading, setIsFilmLoading] = useState(true);
  const [isFilmError, setIsFilmError] = useState(false);

  useEffect(() => {
    if (filmUrl) {
      const getFilmTitle = () => {
        setIsFilmLoading(true);

        fetch(`${API_URL}films/${filmUrl.split("/films/")[1]}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("error");
            }
            return response.json();
          })
          .then(({ title }) => {
            setFilm(title);
            setIsFilmLoading(false);
          })
          .catch((error) => {
            setIsFilmLoading(false);
            setIsFilmError(true);
            console.log(error);
          });
      };
      getFilmTitle();
    }
  }, [filmUrl]);

  if (isFilmLoading) {
    return "Loading...";
  }
  if (isFilmError) {
    return "Failed to load film";
  }
  return <p>{film}</p>;
};
