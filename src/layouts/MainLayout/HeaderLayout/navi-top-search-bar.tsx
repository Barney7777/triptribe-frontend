import { FC, useState, useEffect, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps } from '@mui/system';

import SearchIcon from '@mui/icons-material/Search';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useDebounce } from '@/hooks/use-debounce';
import { fakeAPI } from '@/fakeAPI';
import { fetchedData } from '@/types/search-result';

const DEBOUNCE_INTERVAL = 500;

export const NaviTopSearchBar: FC<{ sx?: SxProps; text?: string }> = ({
  sx,
  text = 'Search...',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<fetchedData>([]);
  const [loading, setLoading] = useState(false);
  // will be replaced by axios
  const fakeFetch = async (inputValues: string) => {
    setLoading(true);
    await fakeAPI.fetchPlaces(inputValues).then((res: fetchedData) => {
      setOptions(res);
      setLoading(false);
    });
  };
  const fetchDataDebounce = useDebounce(fakeFetch, DEBOUNCE_INTERVAL);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const newValue: string = event.target.value;
    // after get new value
    setInputValue(newValue);
    fetchDataDebounce(inputValue);
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  return (
    <Box sx={sx}>
      <Autocomplete
        fullWidth
        forcePopupIcon={false}
        disableClearable
        noOptionsText={inputValue ? 'No Result' : 'Search'}
        // render the dropdown element in hierarchy
        disablePortal={true}
        // fetch the result to from
        // options will be load after fetched data
        options={inputValue ? options : []}
        // render the inputValue to the display window
        inputValue={inputValue}
        // set the async loading for autocomplete
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        // use to override the  equalization method from OPTIONS to INPUT VALUE
        // here, the option.type leads to the input value should be place or restaurant
        getOptionLabel={(option) => option.label}
        loading={loading}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              placeholder={text}
              onChange={onChangeHandler}
              // input base
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ marginLeft: 1 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <Fragment>
                    {loading ? (
                      <CircularProgress
                        color="inherit"
                        size={20}
                      />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }}
            />
          );
        }}
        renderOption={(props, option) => (
          <li {...props}>
            <Box
              component={Link}
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              onClick={() => {
                console.log(option.label);
              }}
            >
              <Box
                marginRight="5px"
                sx={{ height: '40px', width: '40px', display: 'flex', alignItems: 'center' }}
              >
                {option.type === 'restaurant' ? <RestaurantMenuIcon /> : <WbSunnyIcon />}
              </Box>
              {option.label}
            </Box>
          </li>
        )}
      />
    </Box>
  );
};
