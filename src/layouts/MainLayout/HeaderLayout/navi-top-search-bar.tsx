import { FC, useState, useEffect, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps } from '@mui/system';
import NextLink from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { SearchDataType } from '@/types/search-result';
import axiosInstance from '@/utils/request';
import { useDebounce } from '@/hooks/use-debounce';
import { PlacesData } from '@/types/map';
import { CityProps } from '@/types/attractions-restaurants';
import { Typography } from '@mui/material';
import { pinIconList, pinIconColor } from '@/components/map/components/pinIconProps';
const DEBOUNCE_INTERVAL = 500;

type SearchBarProps = {
  sx?: SxProps;
  id?: string;
  text?: string;
  className?: string;
};

export const NaviTopSearchBar: FC<SearchBarProps> = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CityProps[]>([]);
  const [fetchedData, setFetchedData] = useState<SearchDataType<CityProps>>({
    Attraction: [],
    Restaurant: [],
  });
  const [loading, setLoading] = useState(false);
  const { text, ...otherProps } = props;
  const fakeFetch = async (input: string) => {
    setLoading(true);
    axiosInstance
      .request<PlacesData>({
        url: '/search/globalSearch',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          keyword: input,
          limit: 20,
        },
      })
      .then((res) => {
        console.log(res);
        let data: SearchDataType<CityProps> = { Attraction: [], Restaurant: [] };
        res.data.forEach((item) => {
          if (item.type === 'Attraction') {
            data.Attraction.push(item);
          } else {
            data.Restaurant.push(item);
          }
        });
        setFetchedData(data);
      })
      .catch((e) => {
        console.log('fetch data error', e);
      })
      .finally(() => setLoading(false));
  };
  const fetchDataDebounce = useDebounce(fakeFetch, DEBOUNCE_INTERVAL);

  useEffect(() => {
    setOptions(() => [...fetchedData.Attraction, ...fetchedData.Restaurant]);
  }, [fetchedData]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const newValue: string = event.target.value;
    // after getting the new value
    setInputValue(newValue);
    fetchDataDebounce(newValue); // Pass the new value to fetchDataDebounce
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  return (
    <Box {...otherProps}>
      <Autocomplete
        fullWidth
        forcePopupIcon={false}
        disableClearable
        noOptionsText={inputValue ? 'No Result' : 'Search'}
        // render the dropdown element in hierarchy
        disablePortal={true}
        // fetch the result
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
          setOptions([]);
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        // use to override the  equalization method from OPTIONS to INPUT VALUE
        // here, the option.type leads to the input value should be place or restaurant
        getOptionLabel={(option) => option.name}
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
        renderOption={(props, option) => {
          return (
            <li
              {...props}
              key={option._id}
            >
              <Link
                component={NextLink}
                href={`/${option.type.toLowerCase()}s/${option._id}`}
                underline="none"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                width={1}
                f-width
              >
                <Box
                  marginRight="5px"
                  sx={{ height: '40px', width: '40px', display: 'flex', alignItems: 'center' }}
                  color={pinIconColor[option.type]}
                >
                  {pinIconList[option.type]}
                </Box>
                <Box>
                  <Typography>{option.name}</Typography>
                  <Typography>{option.address.formattedAddress}</Typography>
                </Box>
              </Link>
            </li>
          );
        }}
      />
    </Box>
  );
};
