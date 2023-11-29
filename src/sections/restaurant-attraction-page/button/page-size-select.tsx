import { FC } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { QueryParamsType } from '@/types/general';

type PageSizeSelectProps = {
  handleQueryParamsChange: (param: keyof QueryParamsType, value: number) => void;
  pageSize: number;
};
const PageSizeSelect: FC<PageSizeSelectProps> = ({ handleQueryParamsChange, pageSize }) => {
  const handleChange = (event: SelectChangeEvent) => {
    handleQueryParamsChange('pageSize', Number(event.target.value as string));
  };

  return (
    <Box sx={{ width: 95 }}>
      <FormControl
        fullWidth
        variant="standard"
      >
        <InputLabel
          id="page-size-select-label"
          sx={{ fontSize: 12 }}
        >
          Page Size
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="page-size-select"
          value={pageSize.toString()}
          label="Page Size"
          onChange={handleChange}
        >
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={48}>48</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PageSizeSelect;
