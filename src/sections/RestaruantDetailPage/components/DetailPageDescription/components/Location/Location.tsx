import { Box, Typography } from '@mui/material';
import IconText from '@/components/IconText';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const Location = () => {
  return (
    <>
      <Typography variant="h6">Location and Contact</Typography>
      <Box sx={{ marginTop: '20px' }}>
        <IconText
          icon={<LocationOnOutlinedIcon fontSize="small" />}
          text="Location"
        />
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <IconText
          icon={<EmailOutlinedIcon fontSize="small" />}
          text="Email"
        />
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <IconText
          icon={<ComputerOutlinedIcon fontSize="small" />}
          text="Website"
        />
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <IconText
          icon={<AccessTimeOutlinedIcon fontSize="small" />}
          text="Open Hour From 10AM to 8PM"
        />
      </Box>
    </>
  );
};

export default Location;
