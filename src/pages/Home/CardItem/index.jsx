import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../api/api";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export const CardItem = ({ person }) => {
  const [homeworld, setHomeworld] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getHomeworld = () => {
      setIsLoading(true);

      fetch(`${API_URL}planets/${person.homeworld.split("/planets/")[1]}`)
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
  }, [person.homeworld]);

  return (
    <Card>
      <CardActionArea>
        <Link to={`/profile/${person.url.split("/people/")[1]}`}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {person.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              gender: {person.gender}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              homeworld:
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
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};
