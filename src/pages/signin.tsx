import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Link,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Box,
  CardHeader,
} from '@mui/material';
import NextLink from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthPageContainer from '@/components/AuthPageContainer';
import axios from 'axios';
import { useUserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/router';
// import axiosInstance from '@/utils/request';
import { useSnackbar } from 'notistack';
export interface SigninInputs {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export default function Signin() {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<SigninInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUserData } = useUserContext();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: SigninInputs) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', data);
      //use next in lieu after .env.local setting up and mock data removing
      // const response = await axiosInstance.post('/v1/auth/login', data);

      if (response.status === 201) {
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const userResponse = await axios.get('http://localhost:8080/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userRespData = userResponse.data;
        const { email, nickname, role } = userRespData;

        setUserData({ email, nickname, role });
        enqueueSnackbar('Login successful!', {
          variant: 'success',
          autoHideDuration: 2000,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        router.push('/');
      } else {
        console.error('Login failed:', response.data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <AuthPageContainer maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
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
            <CardHeader
              sx={{ p: 0 }}
              subheader={
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Don&apos;t have an account? &nbsp;
                  <Link
                    component={NextLink}
                    href="/signup"
                    underline="hover"
                    variant="subtitle2"
                  >
                    Register
                  </Link>
                </Typography>
              }
              title="Log in"
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="outlined"
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
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  onBlur={() => {
                    trigger('password');
                  }}
                  onChange={onChange}
                  value={value}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
              style={{ textTransform: 'none' }}
              disabled={!isValid}
            >
              Log in
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            alignContent="center"
            justifyContent="center"
          >
            <Link
              component={NextLink}
              href="./passwordReset"
              underline="always"
            >
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthPageContainer>
  );
}
