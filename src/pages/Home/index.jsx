import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import { AutocompleteByCharacters } from "./Autocomplete";
import { PeopleView } from "./PeopleCards";

export const Home = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(9);

  const handleChangePagination = (_, value) => setPage(value);

  return (
    <>
      <AutocompleteByCharacters />
      <Grid container spacing={1} style={{ minHeight: "642px" }}>
        <PeopleView page={page} setCount={setCount} />
      </Grid>
      <Pagination
        count={count}
        shape="rounded"
        page={page}
        onChange={handleChangePagination}
      />
    </>
  );
};
