import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { TableParameter } from "./Table";
import { API_URL } from "../../api/api";

export const Profile = ({ match: { params } }) => {
  const [person, setPerson] = useState([]);
  const [isPersonLoading, setIsPersonLoading] = useState(true);
  const [isPersonError, setIsPersonError] = useState(false);

  useEffect(() => {
    const getPerson = () => {
      setIsPersonLoading(true);
      fetch(`${API_URL}people/${params.id}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("error");
          }
          return response.json();
        })
        .then((data) => {
          setPerson(data);
          setIsPersonLoading(false);
        })
        .catch((error) => {
          setIsPersonLoading(false);
          setIsPersonError(true);
          console.log(error);
        });
    };

    getPerson();
  }, [params.id]);

  if (isPersonLoading) {
    return "Loading...";
  }

  if (isPersonError) {
    return "Failed to load data";
  }

  return (
    <>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        {person.name}
      </Typography>
      <TableParameter person={person} />
    </>
  );
};
