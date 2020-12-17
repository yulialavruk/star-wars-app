import { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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

  return (
    <List>
      <ListItem>
        <ListItemText
          primary="Single-line item"
          // secondary={secondary ? "Secondary text" : null}
        />
      </ListItem>
    </List>
  );
};
