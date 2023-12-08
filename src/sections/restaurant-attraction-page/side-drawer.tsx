import { Box, Drawer, IconButton } from '@mui/material';
import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { MainType } from '@/types/general';
import RestaurantFilter from './restaurants/restaurant-filter';
import AttractionFilter from './attractions/attraction-filter';

type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
  type: MainType;
};

const SideDrawer: FC<SideDrawerProps> = ({ open, onClose, type }) => {
  return (
    <Drawer
      anchor="left"
      PaperProps={{ sx: { pt: '130px', width: '100%', minWidth: 280 } }}
      open={open}
      onClose={onClose}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 20, top: 20 }}
        >
          <CloseIcon />
        </IconButton>
        {type === MainType.Restaurant && <RestaurantFilter />}
        {type === MainType.Attraction && <AttractionFilter />}
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
