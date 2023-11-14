import { NaviTopSearchBar } from '@/layouts/MainLayout/HeaderLayout/navi-top-search-bar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React from 'react';
interface MapWithButton {
  mapToggleHandler: () => void;
}
export const HeroBanner: React.FC<MapWithButton> = ({ mapToggleHandler }) => {
  // const [h2Text, setH2Text] = useState('Where to?');
  // const h2TextList = { places: 'Where to', Restaurant: 'Find places to eat' };
  return (
    <>
      <Stack
        pt={12}
        direction={'column'}
        spacing={8}
        // maxWidth="lg"
        height={450}
        // marginX={'auto'}
        my={4}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          backgroundImage:
            'url("https://drive.google.com/uc?export=view&id=13fBD9P9zs4ZO13Jm5kiusEfkYx8eezry")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <NaviTopSearchBar
          sx={{
            width: '70%',
            bgcolor: 'white',
            borderRadius: 1,
            zIndex: '2',
            overflow: 'hidden',
          }}
          text={'Search'}
        />
        <Button
          color="secondary"
          variant="contained"
          sx={{ width: 169, height: 55, borderRadius: 1.5 }}
          //have a modal
          onClick={mapToggleHandler}
        >
          Map View
        </Button>
      </Stack>
    </>
  );
};
