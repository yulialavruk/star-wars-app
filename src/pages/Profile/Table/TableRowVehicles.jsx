import { useState, useEffect } from "react";
import { API_URL } from "../../../api/api";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export const TableRowVehicles = ({ personVehicles }) => {
  const [vehicles, setVehicles] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getVehicles = () => {
      setIsLoading(true);

      let promises = [];
      let vehicles = [];

      personVehicles.forEach((item) => {
        promises.push(
          fetch(`${API_URL}vehicles/${item.split("/vehicles/")[1]}`)
            .then((response) => {
              if (response.ok === false) {
                throw new Error("error");
              } else {
                return response.json();
              }
            })
            .then(({ name }) => {
              return vehicles.push(name);
            })
        );
      });
      Promise.all(promises)
        .then(() => {
          setVehicles(vehicles);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          console.log(error);
        });
    };
    getVehicles();
  }, [personVehicles]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        vehicles
      </TableCell>
      <TableCell align="right">
        {(() => {
          if (isLoading) {
            return "Loading...";
          }
          if (isError) {
            return "Failed to load data";
          } else {
            return vehicles.map((item, index) => <p key={index}>{item}</p>);
          }
        })()}
      </TableCell>
    </TableRow>
  );
};
