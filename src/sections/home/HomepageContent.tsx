import React from 'react';
import { useState, useEffect } from 'react';
import HomepageList from './HomepageList';
import Box from '@mui/material/Box';
import useRequest from '@/hooks/use-request';

const HomepageContent: React.FC = () => {
  type ImageCardProps = {
    _id: string;
    name: string;
    description: string;
    overAllRating: number;
    photos: {
      imageUrl: string;
      _id: string;
    }[];
  };

  let firstEightAttractions: ImageCardProps[] = [];
  let firstEightRestaurants: ImageCardProps[] = [];
  type DataProps = {
    total: number;
    skip: number;
    limit: number;
    data: ImageCardProps[];
  };
  {
    const { data, isLoading } = useRequest<DataProps>({
      url: '/attractions',
    });
    firstEightAttractions = data !== undefined ? data.data.slice(0, 8) : [];
  }

  {
    const { data, isLoading } = useRequest<DataProps>({
      url: '/restaurants',
    });
    firstEightRestaurants = data !== undefined ? data.data.slice(0, 8) : [];
  }

  return (
    <Box
      sx={{ '& > *': { my: 10 } }}
      data-testid="homepage-content"
    >
      <HomepageList
        listTitle="Attractions"
        imageList={firstEightAttractions}
      />
      <HomepageList
        listTitle="Restaurants"
        imageList={firstEightRestaurants}
      />
    </Box>
  );
};

export default HomepageContent;
