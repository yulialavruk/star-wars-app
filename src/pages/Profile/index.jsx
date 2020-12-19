import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { TableParameter } from "./Table";
import { API_URL } from "../../api/api";

export const Profile = ({ match: { params } }) => {
  const [person, setPerson] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getPerson = () => {
      setIsLoading(true);
      fetch(`${API_URL}people/${params.id}/`)
        .then((response) => {
          if (response.ok === false) {
            throw new Error("error");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setPerson(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          console.log(error);
        });
    };

    getPerson();
  }, [params.id]);

  return (() => {
    if (isLoading) {
      return "Loading...";
    }
    if (isError) {
      return "Failed to load data";
    } else {
      return (
        <>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {person.name}
          </Typography>
          <TableParameter person={person} />
        </>
      );
    }
  })();
};
