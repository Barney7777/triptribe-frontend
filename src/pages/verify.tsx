import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthPageContainer from '@/components/AuthPageContainer';
import { Box, Button, CardHeader, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import axiosInstance from '@/utils/request';
import { useSnackbar } from 'notistack';

type ResponseData = {
  data: { message: string };
};
enum msgType {
  Validated = 'Validated',
  IllegalToken = 'illegal token',
  ExpiredToken = 'expired token',
  Error = 'error',
}
const VerifyEmail = () => {
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const { token } = router.query;
  const [verificationStatus, setVerificationStatus] = useState('pending'); // 初始状态为待定
  const [loading, setLoading] = useState(false);

  const apiUrl = 'auth/verify';
  //实现页面进入自动访问后端http://localhost:8080/api/v1/auth/email接口
  //等待用户点击email的link确认之后 ，自动跳转到home页面
  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        setLoading(true);
        const response: ResponseData = await axiosInstance.request({
          method: 'post',
          url: apiUrl,
          data: { token },
        });
        console.log(response.data);
        if (response.data.message === msgType.Validated) {
          setVerificationStatus('verified');
          setTimeout(() => {
            router.push('/signin');
          }, 2000);
        } else if (response.data.message === msgType.IllegalToken) {
          setVerificationStatus('illegal code');
        } else if (response.data.message === msgType.ExpiredToken) {
          setVerificationStatus('expired error');
        }
      } catch (error) {
        setVerificationStatus('error');
      } finally {
        setLoading(false);
      }
    };
    checkEmailVerification();
  }, [apiUrl]);

  const handleResendEmail = async () => {
    const refreshUrl = 'auth/resend-email'; //call
    try {
      const response = await axiosInstance.request({
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
    <AuthPageContainer maxWidth="xs">
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
                >
                  {(() => {
                    switch (verificationStatus) {
                      case 'verified':
                        return 'Email has been successfully verified.';

                      case 'illegal code':
                        return 'Illegal code';

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

          {loading && verificationStatus === 'verified' && (
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
                disabled={true}
              >
                {verificationStatus === 'verified' ? (
                  <CheckCircleOutlineOutlinedIcon style={{ fontSize: 20 }} />
                ) : (
                  <CircularProgress
                    size={20}
                    style={{ marginRight: '10px' }}
                  />
                )}
                {verificationStatus !== 'verified' ? 'Verifying Email...' : 'Verified'}
              </Button>
            </Grid>
          )}
          {loading && verificationStatus === 'illegal code' && (
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
                disabled={loading}
                onClick={() => {
                  router.push('/signup');
                }}
              >
                Register again
              </Button>
            </Grid>
          )}
          {loading && verificationStatus === 'expired error' && (
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
                onClick={handleResendEmail}
                disabled={loading}
              >
                Resend Email
              </Button>
            </Grid>
          )}
          {verificationStatus !== 'illegal code' && (
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
                onClick={() => {
                  router.push('/signup');
                }}
              >
                Register again
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </AuthPageContainer>
  );
};

export default VerifyEmail;
