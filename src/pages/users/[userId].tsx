import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TabPanel from '@/sections/users/TabPanel';
import useRequest from '@/hooks/use-request';
import { User } from '@/types/user';
import { Layout } from '@/layouts/MainLayout';

const UserDetailPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const url = `users/${userId}`;
  const { data: userData = {}, isLoading, error } = useRequest<User>({ url });
  // console.log(userData)

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
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
        {userData && (
          <>
            <TabPanel user={{ avatar: '/assets/download.jpeg', ...userData } as User} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default UserDetailPage;
