import { useState, useEffect } from "react";
import { API_URL } from "../../../api/api";

export const VehicleItem = ({ vehicleUrl }) => {
  const [vehicle, setVehicle] = useState("");
  const [isVehicleLoading, setIsVehicleLoading] = useState(true);
  const [isVehicleError, setIsVehicleError] = useState(false);

  useEffect(() => {
    if (vehicleUrl) {
      const getVehicle = () => {
        setIsVehicleLoading(true);

        fetch(`${API_URL}vehicles/${vehicleUrl.split("/vehicles/")[1]}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("error");
            }
            return response.json();
          })
          .then(({ name }) => {
            setVehicle(name);
            setIsVehicleLoading(false);
          })
          .catch((error) => {
            setIsVehicleLoading(false);
            setIsVehicleError(true);
            console.log(error);
          });
      };
      getVehicle();
    }
  }, [vehicleUrl]);

  if (isVehicleLoading) {
    return "Loading...";
  }
  if (isVehicleError) {
    return "Failed to load film";
  }
  return <p>{vehicle}</p>;
};
