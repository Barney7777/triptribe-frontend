import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, useMediaQuery, Rating } from '@mui/material';
import PhoneCallbackOutlinedIcon from '@mui/icons-material/PhoneCallbackOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import IconText from '../../../../components/IconText/IconText';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { RouterLink } from '@/components/router-link';

const DetailPageHeader = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <Box
      sx={{
        bgcolor: 'white',
        width: '100%',
        maxHeight: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          padding: '50px',
          maxWidth: '1200px',
          width: '100%',
          height: '100%',
        }}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            md={8}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: 'bold' }}
            >
              Too Good Eggs Cafe
            </Typography>
            <Typography
              sx={{
                marginTop: '8px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '8px',
                // justifyContent: 'center',
              }}
              variant="body2"
              gutterBottom
            >
              <Rating
                name="read-only"
                value={value}
                readOnly
                size="small"
              />
              540 Reviews
            </Typography>

            <Grid
              sx={{ marginTop: '8px' }}
              container
              spacing={1}
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                sm={isDesktop ? 'auto' : 12}
              >
                <IconText
                  icon={<PhoneCallbackOutlinedIcon fontSize="small" />}
                  text="telephone"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={isDesktop ? 'auto' : 12}
              >
                <IconText
                  icon={<EmailOutlinedIcon fontSize="small" />}
                  text="email"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={isDesktop ? 'auto' : 12}
              >
                <IconText
                  icon={<ComputerOutlinedIcon fontSize="small" />}
                  text="website"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: isDesktop ? 'flex-end' : 'flex-start',
              }}
            >
              <Link
                color={'black'}
                component={RouterLink}
                href="/save"
                underline="hover"
                variant="subtitle2"
              >
                <IconText
                  icon={<FavoriteBorderOutlinedIcon fontSize="small" />}
                  text="Save"
                />
              </Link>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 1 }}
              />
              <Link
                color={'black'}
                component={RouterLink}
                href="/write"
                underline="hover"
                variant="subtitle2"
              >
                <IconText
                  icon={<CreateOutlinedIcon fontSize="small" />}
                  text="Write"
                />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DetailPageHeader;
