import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { CardItem } from "./CardItem";
import { API_URL } from "../../../api/api";

export const PeopleView = ({ page, setCount }) => {
  const [people, setPeople] = useState([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [isPeopleError, setIsPeopleError] = useState(false);

  useEffect(() => {
    const getPeople = () => {
      setIsPeopleLoading(true);

      fetch(`${API_URL}people/?page=${page}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("error");
          }
          return response.json();
        })
        .then(({ results, count }) => {
          setPeople(results);
          setCount(Math.ceil(count / 10));
          setIsPeopleLoading(false);
        })
        .catch((error) => {
          setIsPeopleLoading(false);
          setIsPeopleError(true);
          console.log(error);
        });
    };

    getPeople();
  }, [page, setCount]);

  if (isPeopleLoading) {
    return "Loading...";
  }
  if (isPeopleError) {
    return "Failed to load data";
  }
  return people.map((person, index) => (
    <Grid key={index} item xs={6}>
      <CardItem person={person} />
    </Grid>
  ));
};
