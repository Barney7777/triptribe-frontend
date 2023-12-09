import { IconButton } from '@mui/material';
import React from 'react';
import NextLink from 'next/link';
import useRouterQuery from '@/hooks/use-router-query';
import CloseIcon from '@mui/icons-material/Close';

export const MapCloseButton = () => {
  const { urlQuery, setUrlQuery } = useRouterQuery();

  return (
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
  );
};
