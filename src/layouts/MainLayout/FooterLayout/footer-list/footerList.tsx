import { Box } from '@mui/material';
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
  const footerBgColor = theme.palette.grey[100];
  const listHeaderColor = theme.palette.grey[500];

  type List = {
    name: string[];
    items: string[];
  };

  type FooterListObject = {
    explore1: List;
    explore2: List;
    company: List;
  };

  const footerListObj: FooterListObject = {
    explore1: {
      name: ['Homepage', 'Restaurant', 'Attraction'],
      items: ['/', '/restaurants', '/attractions'],
    },
    explore2: {
      name: ['Sign in', 'Sign up', 'Write a review'],
      items: ['/signin', '/signup', '/review'],
    },
    company: {
      name: ['Terms of Use', 'Privacy and Cookies Statement', 'Contact Us'],
      items: ['/signin', '/signup', '/review'],
    },
  };

  return (
    <Box>
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 md:gap-8 lg:gap-16">
        <Box
          sx={{
            width: '100%',
          }}
        >
          <List
            subheader={
              <ListSubheader
                sx={{
                  bgcolor: footerBgColor,
                  color: listHeaderColor,
                  fontWeight: 'bold',
                }}
              >
                EXPLORE
              </ListSubheader>
            }
          >
            {footerListObj.explore1.name.map((explore1Item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <HorizontalRuleIcon style={{ color: primaryGreen }} />
                </ListItemIcon>
                <Link
                  href={footerListObj.explore1.items[index]}
                  passHref
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText
                    primary={explore1Item}
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
              <ListSubheader
                sx={{
                  bgcolor: footerBgColor,
                  color: listHeaderColor,
                  fontWeight: 'bold',
                  visibility: 'hidden',
                }}
              >
                EXPLORE2
              </ListSubheader>
            }
          >
            {footerListObj.explore2.name.map((explore2Item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <HorizontalRuleIcon style={{ color: primaryGreen }} />
                </ListItemIcon>
                <Link
                  href={footerListObj.explore2.items[index]}
                  passHref
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText
                    primary={explore2Item}
                    primaryTypographyProps={{ fontSize: '14px' }}
                    style={{ whiteSpace: 'nowrap' }}
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
              <ListSubheader
                sx={{
                  bgcolor: footerBgColor,
                  color: listHeaderColor,
                  fontWeight: 'bold',
                }}
              >
                COMPANY
              </ListSubheader>
            }
          >
            {footerListObj.company.name.map((companyItem, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <HorizontalRuleIcon style={{ color: primaryGreen }} />
                </ListItemIcon>
                <Link
                  href={footerListObj.company.items[index]}
                  passHref
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText
                    primary={companyItem}
                    primaryTypographyProps={{ fontSize: '14px', whiteSpace: 'normal' }}
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
