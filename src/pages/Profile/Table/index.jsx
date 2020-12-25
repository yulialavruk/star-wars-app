import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FilmItem } from "./FilmItem";
import { VehicleItem } from "./VehicleItem";
import { HomeworldView } from "../../../components/HomeworldView";

export const TableParameter = ({ person }) => {
  const rows = [
    { item: "height", value: person.height },
    { item: "mass", value: person.mass },
    { item: "hair_color", value: person.hair_color },
    { item: "skin_color", value: person.skin_color },
    { item: "eye_color", value: person.eye_color },
    { item: "birth_year", value: person.birth_year },
    { item: "gender", value: person.gender },
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item}>
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell component="th" scope="row">
              films
            </TableCell>
            <TableCell align="right">
              {person.films.map((film, index) => (
                <FilmItem key={index} filmUrl={film} />
              ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              vehicles
            </TableCell>
            <TableCell align="right">
              {person.vehicles.map((vehicle, index) => (
                <VehicleItem key={index} vehicleUrl={vehicle} />
              ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              homeworld
            </TableCell>
            <TableCell align="right">
              <HomeworldView homeworld={person.homeworld} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
