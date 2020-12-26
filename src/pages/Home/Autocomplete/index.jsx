import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { API_URL } from "../../../api/api";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

export const AutocompleteByCharacters = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearchLoading(true);

      const getSearchPeople = async () => {
        const response = await fetch(
          `${API_URL}people/?search=${debouncedSearchTerm}`
        );
        const { results } = await response.json();

        setOptions(
          results.map((item) => {
            return { name: item.name, url: item.url };
          })
        );
        setIsSearchLoading(false);
      };

      getSearchPeople();
    } else {
      setOptions([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300, textAlign: "center", margin: "10px auto" }}
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
      loading={isSearchLoading}
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
                {isSearchLoading ? (
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
