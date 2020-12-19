import { useState, useEffect } from "react";
import { API_URL } from "../../../api/api";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export const TableRowHomeworld = ({ personHomeworld }) => {
  const [homeworld, setHomeworld] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getHomeworld = () => {
      setIsLoading(true);

      fetch(`${API_URL}planets/${personHomeworld.split("/planets/")[1]}`)
        .then((response) => {
          if (response.ok === false) {
            throw new Error("error");
          } else {
            return response.json();
          }
        })
        .then(({ name }) => {
          setHomeworld(name);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          console.log(error);
        });
    };
    getHomeworld();
  }, [personHomeworld]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        homeworld
      </TableCell>
      <TableCell align="right">
        {(() => {
          if (isLoading) {
            return "Loading...";
          }
          if (isError) {
            return "Failed to load data";
          } else {
            return homeworld;
          }
        })()}
      </TableCell>
    </TableRow>
  );
};
