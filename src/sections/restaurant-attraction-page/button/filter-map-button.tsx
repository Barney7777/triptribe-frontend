import { Button, ButtonGroup, Typography } from '@mui/material';
import React, { FC } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MapIcon from '@mui/icons-material/Map';
type FilterMapButtonProps = {
  handleFiltersToggle: () => void;
};

const FilterMapButton: FC<FilterMapButtonProps> = ({ handleFiltersToggle }) => {
  return (
    <ButtonGroup
      variant="contained"
      orientation="vertical"
      size="large"
      aria-label="outlined button group"
    >
      <Button onClick={handleFiltersToggle}>
        <FilterAltIcon />
        <Typography>Filter</Typography>
      </Button>
      <Button>
        <MapIcon />
        <Typography>Map View</Typography>
      </Button>
    </ButtonGroup>
  );
};

export default FilterMapButton;
