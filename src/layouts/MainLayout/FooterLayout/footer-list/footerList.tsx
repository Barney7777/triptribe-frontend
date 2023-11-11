import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ListSubheader from '@mui/material/ListSubheader';
import { useTheme } from '@mui/material/styles';
const FooterList: React.FC = () => {
  const theme = useTheme();
  const primaryGreen = theme.palette.primary.main;

  type List = {
    name: string[];
    items: string[];
  };

  type FooterListObject = {
    menu: List;
    user: List;
  };

  const footerListObj: FooterListObject = {
    menu: {
      name: ['Homepage', 'Restaurant', 'Attraction'],
      items: ['/', '/restaurants', '/attractions'],
    },
    user: {
      name: ['Sign in', 'Sign up', 'Write a review'],
      items: ['/signin', '/signup', '/review'],
    },
  };

  return (
    <Box>
      <div className="flex flex-col sm:flex-row sm:gap-16 md:gap-32">
        <Box
          sx={{
            width: '100%',
          }}
        >
          <List
            subheader={
              <ListSubheader sx={{ bgcolor: '#F8F9FA', color: '#6C737F', fontWeight: 'bold' }}>
                Menu
              </ListSubheader>
            }
          >
            {footerListObj.menu.name.map((menuItem, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <HorizontalRuleIcon style={{ color: primaryGreen }} />
                </ListItemIcon>
                <Link
                  href={footerListObj.menu.items[index]}
                  passHref
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText
                    primary={menuItem}
                    primaryTypographyProps={{ fontSize: '14px' }}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <List
            subheader={
              <ListSubheader sx={{ bgcolor: '#F8F9FA', color: '#6C737F', fontWeight: 'bold' }}>
                User
              </ListSubheader>
            }
          >
            {footerListObj.user.name.map((userItem, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <HorizontalRuleIcon style={{ color: primaryGreen }} />
                </ListItemIcon>
                <Link
                  href={footerListObj.user.items[index]}
                  passHref
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText
                    primary={userItem}
                    primaryTypographyProps={{ fontSize: '14px' }}
                    style={{ whiteSpace: 'nowrap' }}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    </Box>
  );
};
export default FooterList;
