import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TableRowFilms } from "./TableRowFilms";
import { TableRowVehicles } from "./TableRowVehicles";
import { TableRowHomeworld } from "./TableRowHomeworld";

const createData = (item, value) => {
  return { item, value };
};

export const TableParameter = ({ person }) => {
  const rows = [
    createData("height", person.height),
    createData("mass", person.mass),
    createData("hair_color", person.hair_color),
    createData("skin_color", person.skin_color),
    createData("eye_color", person.eye_color),
    createData("birth_year", person.birth_year),
    createData("gender", person.gender),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className="" aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item + row.value}>
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
          <TableRowFilms personFilms={person.films} />
          <TableRowVehicles personVehicles={person.vehicles} />
          <TableRowHomeworld personHomeworld={person.homeworld} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
