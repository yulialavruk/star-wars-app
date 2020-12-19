import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { API_URL } from "../../api/api";
import { AutocompleteByCharacters } from "./Autocomplete";

export const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const getPeople = () => {
      setIsLoading(true);

      fetch(`${API_URL}people/?page=${page}`)
        .then((response) => {
          if (response.ok === false) {
            throw new Error("error");
          } else {
            return response.json();
          }
        })
        .then(({ results, count }) => {
          let promises = [];
          results.map((item) => {
            const path = `${API_URL}${item.homeworld.split("/api/")[1]}`;
            return promises.push(
              fetch(path)
                .then((response) => {
                  if (response.ok === false) {
                    throw new Error("error");
                  } else {
                    return response.json();
                  }
                })
                .then(({ name }) => {
                  return (item.homeworld = name);
                })
            );
          });
          Promise.all(promises)
            .then(() => {
              setData(results);
              setCount(Math.ceil(count / 10));
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
  }, [page]);

  return (
    <>
      <AutocompleteByCharacters />
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid key={index} item xs={6}>
            <Card className="">
              <CardActionArea>
                <Link to={`/profile/${item.url.match(/\d+/)}`}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      gender: {item.gender}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      homeworld: {item.homeworld}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <Pagination
          count={count}
          shape="rounded"
          page={page}
          onChange={handleChange}
        />
      </Grid>
    </>
  );
};
