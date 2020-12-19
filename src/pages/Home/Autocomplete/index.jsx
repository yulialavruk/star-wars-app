import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../api/api";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

export const AutocompleteByCharacters = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputValue === "") {
      setIsLoading(false);
      setOptions([]);
      return;
    }

    (async () => {
      setIsLoading(true);
      const response = await fetch(`${API_URL}people/?search=${inputValue}`);
      const { results } = await response.json();

      setOptions(
        results.map((item) => {
          return { name: item.name, url: item.url };
        })
      );
      setIsLoading(false);
    })();
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
      autoHighlight
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      renderOption={(option) => (
        <Link to={`/profile/${option.url.split("/people/")[1]}`}>
          {option.name}
        </Link>
      )}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
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
