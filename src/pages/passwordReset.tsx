import React from 'react';
import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthPageContainer from '@/components/AuthPageContainer';

export interface PasswordResetInputs {
  email: string;
}
// Define validation schema using yup
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
});
export default function PasswordReset() {
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: PasswordResetInputs) => {
    // Handle the form submission
    console.log(data);
  };

  return (
    <AuthPageContainer maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          container
          spacing={2}
          sx={{
            padding: '32px 24px',
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
          >
            <Typography variant="h5">Forgot Password</Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label="Email Address"
                  onBlur={() => {
                    trigger('email');
                  }}
                  onChange={onChange}
                  value={value}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid}
              style={{ textTransform: 'none' }}
            >
              Send Reset Link
            </Button>
          </Grid>
        </Grid>
      </Box>
    </AuthPageContainer>
  );
}
