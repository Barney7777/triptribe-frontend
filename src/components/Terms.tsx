import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Terms: React.FC = () => {
  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
      >
        Terms and Conditions
      </Typography>
      <Typography
        variant="body1"
        paragraph
      >
        These are the terms and conditions of using our service. Please read them carefully.
        {/* terms and conditions text */}
      </Typography>
    </Container>
  );
};

export default Terms;
