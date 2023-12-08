import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  IconButton,
  TextField,
  Stack,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CardTheme from './components/CardTheme';
import { useState } from 'react';
import { User } from '@/types/user';

type GeneralCardProps = {
  user: User;
};

export const GeneralCard = (props: GeneralCardProps) => {
  const { user } = props;
  const [inputText, setInputText] = useState('');

  const textHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const charLimit = 300;
  const charLeft = charLimit - inputText.length;

  return (
    <Container>
      <Card sx={{ bgcolor: CardTheme.bgColor }}>
        <CardContent>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6">Personal info</Typography>
            <Typography
              variant="body2"
              color={CardTheme.helperTextColor}
              sx={{
                mt: 1,
              }}
            >
              Customize how your profile information will appear to the networks.
            </Typography>
          </Box>
          <Divider />
          <Grid
            container
            spacing={1}
            mt={1}
          >
            <Grid
              item
              md={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <Avatar
                  src={user.avatarUrl}
                  sx={{
                    height: 150,
                    m: 2,
                    width: 150,
                  }}
                />
                <IconButton
                  color="primary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    zIndex: 2,
                    border: `${CardTheme.borderColor} solid 2px`,
                    borderRadius: '50%',
                    left: 130,
                    top: 130,
                    boxShadow: 'sm',
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid
              item
              md={8}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                variant="outlined"
                label="ID"
                defaultValue={user._id}
                fullWidth
                disabled
                sx={{
                  m: 1,
                }}
              ></TextField>
              <TextField
                variant="outlined"
                label="Nickname"
                defaultValue={user.nickname}
                fullWidth
                sx={{
                  m: 1,
                }}
              ></TextField>
              <TextField
                variant="outlined"
                label="Email Address"
                value={user.email}
                disabled
                defaultValue="xxx.xx@email.com"
                fullWidth
                sx={{
                  m: 1,
                }}
              ></TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            size="small"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
          >
            Save
          </Button>
        </CardActions>
      </Card>
      <Card
        sx={{
          mt: 4,
          bgcolor: CardTheme.bgColor,
        }}
      >
        <CardContent>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6">Bio</Typography>
            <Typography
              variant="body2"
              color={CardTheme.helperTextColor}
              sx={{
                mt: 1,
              }}
            >
              Write a short introduction to be displayed on your profile.
            </Typography>
          </Box>
          <Divider />
          <Stack
            spacing={2}
            sx={{ my: 1 }}
          >
            <TextField
              size="small"
              multiline
              rows={4}
              sx={{ mt: 1.5 }}
              defaultValue="xxx"
              onChange={textHandler}
              value={inputText}
              inputProps={{
                maxLength: { charLimit },
              }}
            />
            <Typography
              variant="body2"
              color={CardTheme.helperTextColor}
            >
              {charLeft} characters left
            </Typography>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            size="small"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};
