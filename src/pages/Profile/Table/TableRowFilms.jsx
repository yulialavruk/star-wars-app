import { useState, useEffect } from "react";
import { API_URL } from "../../../api/api";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export const TableRowFilms = ({ personFilms }) => {
  const [films, setFilms] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getFilms = () => {
      setIsLoading(true);

      let promises = [];
      let films = [];
      personFilms.forEach((item) => {
        promises.push(
          fetch(`${API_URL}films/${item.split("/films/")[1]}`)
            .then((response) => {
              if (response.ok === false) {
                throw new Error("error");
              } else {
                return response.json();
              }
            })
            .then(({ title }) => {
              return films.push(title);
            })
        );
      });
      Promise.all(promises)
        .then(() => {
          setFilms(films);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          console.log(error);
        });
    };
    getFilms();
  }, [personFilms]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        films
      </TableCell>
      <TableCell align="right">
        {(() => {
          if (isLoading) {
            return "Loading...";
          }
          if (isError) {
            return "Failed to load data";
          }
          if (films) {
            return films.map((item, index) => <p key={index}>{item}</p>);
          } else {
            return "n/a";
          }
        })()}
      </TableCell>
    </TableRow>
  );
};
