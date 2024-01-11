import { useRouter } from 'next/router';
import { Container, Box, Typography } from '@mui/material';
import Error from '@/components/Error';
import TabPanel from '@/sections/users/TabPanel';
import { User } from '@/types/user';
import axiosInstance from '@/utils/request';
import useSWR from 'swr';
import Layout from '@/layouts/MainLayout';

const UserDetailPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const isMe = userId === 'me';
  const userUrl = isMe ? '/users/me' : `/users/${userId}`;

  const requestOptions =
    userId === undefined
      ? {}
      : {
          url: userUrl,
          method: 'get',
        };

  const { data, error, isLoading } = useSWR<User>(requestOptions, async () => {
    const response = await axiosInstance.request<User>(requestOptions);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return (
      <Error
        errorMessage={error.message}
        errorStatus={error.response?.status}
      />
    );
  }

  return (
    <Layout>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          mt: 5,
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: '100%',
          }}
        >
          <Typography variant="h5">User Profile</Typography>
        </Box>
        {data && (
          <>
            <TabPanel
              user={data as User}
              showPrivacyTabs={isMe}
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default UserDetailPage;
