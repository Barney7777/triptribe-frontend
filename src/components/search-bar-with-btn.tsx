import React, { useState } from 'react';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const SearchBarWithBtn = (dataHandler: any) => {
  const [inputValue, setInputValue] = useState<string>('');
  // onFetchData();
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onFetchData = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    axios
      .get(`${inputValue}`)
      .then((res) => {
        dataHandler(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {' '}
      <FormControl>
        {/* <FormLabel>Enter Name</FormLabel> */}
        <TextField></TextField>
        <Button>Submit</Button>
      </FormControl>
      <form onSubmit={() => onFetchData}>
        <input
          type="text"
          onChange={inputHandler}
          value={inputValue}
        />
        <input
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};
