import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export const Profile = ({ match: { params } }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getPeople = () => {
      setIsLoading(true);
      fetch(`https://swapi.dev/api/people/${params.id}/`)
        .then((response) => {
          if (response.ok === false) {
            throw new Error("error");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          let promises = [];
          let films = [];
          let vehicles = [];
          data.films.forEach((item) => {
            promises.push(
              fetch(item)
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
          data.vehicles.forEach((item) => {
            promises.push(
              fetch(item)
                .then((response) => {
                  if (response.ok === false) {
                    throw new Error("error");
                  } else {
                    return response.json();
                  }
                })
                .then(({ name, model }) => {
                  return vehicles.push({ name, model });
                })
            );
          });
          promises.push(
            fetch(data.homeworld)
              .then((response) => {
                if (response.ok === false) {
                  throw new Error("error");
                } else {
                  return response.json();
                }
              })
              .then(({ name }) => {
                return (data.homeworld = name);
              })
          );

          Promise.all(promises)
            .then(() => {
              data.films = films;
              data.vehicles = vehicles;
              setData(data);
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              setIsError(true);
              console.log(error);
            });
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          console.log(error);
        });
    };

    getPeople();
  }, []);

  function createData(item, value) {
    return { item, value };
  }

  const rows = [
    createData("height", data.height),
    createData("mass", data.mass),
    createData("hair_color", data.hair_color),
    createData("skin_color", data.skin_color),
    createData("eye_color", data.eye_color),
    createData("birth_year", data.birth_year),
    createData("gender", data.gender),
    createData("homeworld", data.homeworld),
    createData(
      "vehicles",
      data.vehicles &&
        data.vehicles.map((item, index) => (
          <p key={index}>
            {item.name}: {item.model}
          </p>
        ))
    ),
    createData(
      "films",
      data.films && data.films.map((item, index) => <p key={index}>{item}</p>)
    ),
  ];

  return (
    <TableContainer component={Paper}>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        {data.name}
      </Typography>
      <Table className="" aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item + row.value}>
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
