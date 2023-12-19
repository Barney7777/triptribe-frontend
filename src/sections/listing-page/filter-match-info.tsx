import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';

interface FilterMatchInfoProps {
  onClear: () => void;
}
const FilterMatchInfo: FC<FilterMatchInfoProps> = ({ onClear }) => {
  const matchResultsCount = 88;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography
          fontSize={18}
          color="text.secondary"
        >
          {matchResultsCount} results match your filters
        </Typography>
      </Box>

      <Button
        sx={{ textTransform: 'none', color: '#616161' }}
        onClick={onClear}
      >
        <DeleteIcon />
        <Box sx={{ pt: '2px' }}>
          <Typography>Clear All</Typography>
        </Box>
      </Button>
    </Box>
  );
};

export default FilterMatchInfo;
