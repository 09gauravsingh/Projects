import { React, useState } from "react";
import "./SearchBox.css";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const SearchBox = (props) => {
  const { handleSearch, placeholder } = props;
  const [searchUser, setSearchUser] = useState("");
  const [senddata, setsenddata] = useState("");


  const handleUserInput = (e) => {
    handleSearch(e?.target?.value);
    setSearchUser(e?.target?.value);
  };

  return (
    <>
      <TextField
        className="SearchBox"
        name="search"
        value={searchUser}
        placeholder={placeholder}
        onChange={handleUserInput}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon fontSize="large" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SearchBox;
