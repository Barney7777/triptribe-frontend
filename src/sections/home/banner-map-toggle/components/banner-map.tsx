import NextLink from 'next/link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Map } from '@/components/map';
import useRouterQuery from '@/hooks/use-router-query';
export const BannerMap = () => {
  const { urlQuery, setUrlQuery } = useRouterQuery();

  return (
    <Box sx={{}}>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          aria-label="Close Map"
          role="button"
          LinkComponent={NextLink}
          // href="/"
          onClick={() => {
            const { map, ...otherQueries } = urlQuery;
            setUrlQuery(otherQueries);
          }}
          sx={{
            position: 'absolute',
            width: 40,
            height: 40,
            top: 10,
            right: 10,
            borderRadius: '50%',
            zIndex: 999,
            bgcolor: 'white',
            '&:hover': {
              bgcolor: 'white',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Map
          sx={{ height: 600 }}
          mapId={'bannerMap'}
        />
      </Box>
    </Box>
  );
};
