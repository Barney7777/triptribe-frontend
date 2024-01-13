import { useRouter } from 'next/router';
import { Container, Box, Typography } from '@mui/material';
import Error from '@/components/Error';
import TabPanel from '@/sections/users/TabPanel';
import { User } from '@/types/user';
import axiosInstance from '@/utils/request';
import useSWR from 'swr';
import Layout from '@/layouts/MainLayout';
import { useUserContext } from '@/contexts/user-context/user-context';
import { CircularLoading } from '@/components/CircularLoading';

const UserDetailPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { isAuthenticated, userData = null } = useUserContext();

  const isMe = userId === 'me';

  // when user log in, if url is /users/{userself's id}
  const isMyIDAndLogin = !isMe && userId && isAuthenticated && userId === userData?._id;
  if (isMyIDAndLogin) {
    router.replace('/users/me');
  }

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
    return <CircularLoading size={80} />;
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
              isMe={isMe}
              userId={userId}
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default UserDetailPage;
