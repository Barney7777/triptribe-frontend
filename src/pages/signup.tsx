import React, { useContext } from 'react';
import {
  Box,
  Link,
  Typography,
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  CardHeader,
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import NextLink from 'next/link';
import AuthPageContainer from '@/components/AuthPageContainer';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { UserContext } from '@/contexts/user-context/user-context';

export type SignupInputs = {
  email: string;
  password: string;
  passwordConfirm: string;
  terms: boolean;
};

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Password must be at least 8 characters, and include at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
  terms: yup.boolean().default(false).oneOf([true], 'You must agree to the Terms and Conditions'),
});

const SignUp = () => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const { signUp } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    try {
      await signUp(data);
      router.push('/signin');
      enqueueSnackbar('Register Successful!', {
        variant: 'success',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    } catch (err) {
      enqueueSnackbar('Register Failed', {
        variant: 'error',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
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
              sx={{ p: 0, mb: 1 }}
              subheader={
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Already have an account? &nbsp;
                  <Link
                    component={NextLink}
                    href="/signin"
                    underline="hover"
                    variant="subtitle2"
                  >
                    Log in
                  </Link>
                </Typography>
              }
              title="Register"
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
                  type="password"
                  variant="outlined"
                  label="Password"
                  onBlur={() => {
                    trigger('password');
                  }}
                  onChange={onChange}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  type="password"
                  variant="outlined"
                  label="Password Confirmation"
                  onBlur={() => {
                    trigger('passwordConfirm');
                  }}
                  onChange={onChange}
                  value={value}
                  error={!!errors.passwordConfirm}
                  helperText={errors.passwordConfirm?.message}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Controller
              name="terms"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  label={
                    <span>
                      I agree to the&nbsp;
                      <Link
                        component={NextLink}
                        href="/terms"
                        underline="always"
                      >
                        Terms and Conditions
                      </Link>
                    </span>
                  }
                />
              )}
            />
            <FormHelperText error={!!errors.terms}>{errors.terms?.message}</FormHelperText>
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
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </AuthPageContainer>
  );
};

export default SignUp;
