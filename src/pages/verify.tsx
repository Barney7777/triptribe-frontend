import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthPageContainer from '@/components/AuthPageContainer';
import { Box, Button, CardHeader, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import axiosInstance from '@/utils/request';
import { useSnackbar } from 'notistack';
import { UserContext } from '@/contexts/user-context/user-context';

type ResponseData = {
  data: { message: string };
};
enum msgType {
  Validated = 'Validated',
  IllegalToken = 'illegal token',
  ExpiredToken = 'expired token',
  Error = 'error',
  EmailValided = 'Email token not found',
}
const VerifyEmail = () => {
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const { token } = router.query;
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const apiUrl = 'auth/verify';

  const { signIn, isAuthenticated } = useContext(UserContext);
  if (isAuthenticated) {
    router.push('/');
  }

  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        setLoading(true);
        const response: ResponseData = await axiosInstance.request({
          method: 'post',
          url: apiUrl,
          data: { token },
        });

        if (
          response.data.message === msgType.Validated ||
          response.data.message === msgType.EmailValided
        ) {
          setVerificationStatus('verified');
          setTimeout(() => {
            router.push('/signin');
          }, 1000);
        } else if (
          response.data.message === msgType.IllegalToken ||
          response.data.message === msgType.ExpiredToken
        ) {
          setVerificationStatus('illegal code');
        } else {
          setVerificationStatus('error');
        }
      } catch (error) {
        setVerificationStatus('error');
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      checkEmailVerification();
    }
  }, [token, router]);

  const handleResendEmail = async () => {
    const refreshUrl = 'auth/resend-email';
    try {
      await axiosInstance.request({
        method: 'post',
        url: refreshUrl,
        data: { token },
      });
      enqueueSnackbar('Resend Email Successful!', {
        variant: 'success',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    } catch (error) {
      enqueueSnackbar('Resend Email Failed', {
        variant: 'error',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      console.error('Error during email resend:', error);
    }
  };

  return (
    <AuthPageContainer
      maxWidth="xs"
      isVerifyPage
    >
      <Box>
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
                  sx={{ pt: 2 }}
                >
                  {(() => {
                    switch (verificationStatus) {
                      case 'verified':
                        return 'Your Email has been verified. Please login directly';
                      case 'illegal code':
                        return 'The verify token is illegal. Please resend an email to refresh it';
                      default:
                        return 'An error occurred during email verification. Please try again later.';
                    }
                  })()}
                  <br />
                </Typography>
              }
              title="Verify Email"
            />
          </Grid>

          <Grid
            item
            xs={12}
          >
            {loading && (
              <CircularProgress
                size={20}
                style={{ marginRight: '10px' }}
              />
            )}

            {verificationStatus === 'verified' && (
              <CheckCircleOutlineOutlinedIcon style={{ fontSize: 20 }} />
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              style={{ textTransform: 'none' }}
              disabled={loading}
              onClick={() => {
                if (verificationStatus === 'verified') {
                  router.push('/signin');
                } else {
                  handleResendEmail();
                }
              }}
            >
              {verificationStatus === 'verified' ? 'Sign In Now' : 'Resend Email'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </AuthPageContainer>
  );
};

export default VerifyEmail;
