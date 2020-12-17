import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getPeople = () => {
      setIsLoading(true);

      fetch("https://swapi.dev/api/people/")
        .then((response) => {
          if (response.ok === false) {
            throw new Error("error");
          } else {
            return response.json();
          }
        })
        .then(({ results }) => {
          let promises = [];
          results.map((item) => {
            return promises.push(
              fetch(item.homeworld)
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
    </Grid>
  );
};
