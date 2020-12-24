import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { CardItem } from "./CardItem";
import Pagination from "@material-ui/lab/Pagination";
import { API_URL } from "../../api/api";
import { AutocompleteByCharacters } from "./Autocomplete";

export const Home = () => {
  const [people, setPeople] = useState([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [isPeopleError, setIsPeopleError] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

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
  }, [page]);

  if (isPeopleLoading) {
    return "Loading...";
  }
  if (isPeopleError) {
    return "Failed to load data";
  }

  return (
    <>
      <AutocompleteByCharacters />
      <Grid container spacing={2}>
        {people.map((person, index) => (
          <Grid key={index} item xs={6}>
            <CardItem person={person} />
          </Grid>
        ))}
        <Pagination
          count={count}
          shape="rounded"
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Grid>
    </>
  );
};
