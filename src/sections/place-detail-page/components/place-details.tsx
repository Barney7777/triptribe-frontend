import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Grid,
  Typography,
  Rating,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from '@mui/material';
import PhoneCallbackOutlinedIcon from '@mui/icons-material/PhoneCallbackOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Divider from '@mui/material/Divider';
import IconText from '@/components/IconText';
import { PlaceProps } from '@/types/attractions-restaurants';
import { useRouter } from 'next/router';

type PlaceDetailsProps = {
  placeData: PlaceProps;
  ratingTotalCount: number;
};

const PlaceDetails: React.FC<PlaceDetailsProps> = ({ placeData, ratingTotalCount }) => {
  const addLike = () => {};
  const writeReview = () => {};
  const router = useRouter();
  const detailIconList: { [key: string]: React.JSX.Element } = {
    phone: <PhoneCallbackOutlinedIcon fontSize="small" />,
    email: <EmailOutlinedIcon fontSize="small" />,
    website: <ComputerOutlinedIcon fontSize="small" />,
  };

  return (
    <Box width={1}>
      <Grid container>
        <Grid
          item
          xs={8}
        >
          <Typography
            fontSize={30}
            component="h2"
            sx={{ fontWeight: 'bold' }}
          >
            {placeData.name.toUpperCase()}
          </Typography>
          <Typography
            fontSize={16}
            component="h3"
            noWrap
          >
            {placeData.description}
          </Typography>
          <Link href={'#place-description'}>More</Link>
          <Typography
            sx={{
              marginTop: '8px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: '8px',
            }}
            variant="body2"
            gutterBottom
          >
            <Rating
              name="read-only"
              value={placeData.overAllRating}
              readOnly
              size="small"
              sx={{ mr: 1 }}
            />
            {ratingTotalCount === 0 ? (
              <>No Review</>
            ) : (
              <Link
                component={NextLink}
                href={`${router.asPath}/reviews`}
              >{`${ratingTotalCount} reviews`}</Link>
            )}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              height: 45,
            }}
          >
            <Button
              sx={{ color: 'black' }}
              onClick={addLike}
            >
              <IconText
                icon={<FavoriteBorderOutlinedIcon fontSize="small" />}
                text="Save"
              />
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 1 }}
            />
            <Button
              sx={{ color: 'black' }}
              onClick={writeReview}
            >
              <IconText
                icon={<CreateOutlinedIcon fontSize="small" />}
                text="Write"
              />
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <List
          sx={{
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
          }}
        >
          {['phone', 'email', 'website'].map((text, index) => {
            return (
              <ListItem
                key={text}
                sx={{ p: 0, width: 'auto' }}
              >
                <ListItemIcon sx={{ color: 'black', justifyContent: 'center', ml: -1 }}>
                  {detailIconList[text]}
                </ListItemIcon>

                <Box
                  // ml={-1}
                  mr={1}
                >
                  {text === 'website' ? (
                    <Button href={placeData.website}>Website</Button>
                  ) : (
                    <ListItemText
                      primary={placeData[text] as string}
                      primaryTypographyProps={{ fontSize: 16 }}
                    />
                  )}
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default PlaceDetails;
