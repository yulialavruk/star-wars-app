import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

export const AutocompleteByCharacters = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // const loading = open && options.length === 0 && inputValue === "";
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setIsLoading(false);
      setOptions([]);
      return undefined;
    }

    (async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${inputValue}`
      );
      // await sleep(1e3); // For demo purposes.
      const { results } = await response.json();

      if (active) {
        setOptions(
          results.map((item) => {
            return { name: item.name, url: item.url };
          })
        );
        setIsLoading(false);
      }
    })();

    return () => {
      console.log("bla");
      active = false;
    };
  }, [inputValue]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300, textAlign: "center", margin: "20px auto" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => option.name}
      options={options}
      renderOption={(option) => (
        <Link to={`/profile/${option.url.match(/\d+/)}`}>{option.name}</Link>
      )}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          value={inputValue}
          onChange={onInputChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
