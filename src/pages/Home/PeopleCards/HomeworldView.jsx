import { useState, useEffect } from "react";
import { API_URL } from "../../../api/api";

export const HomeworldView = ({ homeworld }) => {
  const [planet, setPlanet] = useState("");
  const [isPlanetLoading, setIsPlanetLoading] = useState(true);
  const [isPlanetError, setIsPlanetError] = useState(false);

  useEffect(() => {
    if (homeworld) {
      const getPlanet = () => {
        setIsPlanetLoading(true);

        fetch(`${API_URL}planets/${homeworld.split("/planets/")[1]}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("error");
            }
            return response.json();
          })
          .then(({ name }) => {
            setPlanet(name);
            setIsPlanetLoading(false);
          })
          .catch((error) => {
            setIsPlanetLoading(false);
            setIsPlanetError(true);
            console.log(error);
          });
      };

      getPlanet();
    }
  }, [homeworld]);

  if (isPlanetLoading) {
    return "Loading...";
  }
  if (isPlanetError) {
    return "Failed to load planet";
  }
  return planet;
};
