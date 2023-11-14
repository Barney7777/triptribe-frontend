import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { NaviTopSearchBar } from '@/layouts/MainLayout/HeaderLayout/navi-top-search-bar';
import { AccountButton } from '@/layouts/MainLayout/HeaderLayout/account-button';
import { PlacesTab } from '@/layouts/MainLayout/HeaderLayout/places-tab';
import { LogoButton } from '@/layouts/MainLayout/HeaderLayout/logo-button';

import { usePathname } from 'next/navigation';

export const TopNav: FC = () => {
  const pathname = usePathname();
  const autoHideSearchBarPageList = ['/signup', '/signin', '/'];
  const isHomepage = autoHideSearchBarPageList.includes(pathname); // hide search bar responsively in homepage
  const autoHideRestAttrPageList = ['/signup', '/signin'];
  const isSearAttrPage = autoHideRestAttrPageList.includes(pathname); // hide place permanently tab in signin/signup page
  const [loginStatus, setLoginStatus] = useState(false);
  // show searchbar is false default.
  // in homepage, it is false default
  // in other page, it is true
  const [showSearchBar, setShowSearchBar] = useState<boolean>(!isHomepage);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // return to homepage, rerender header
  useEffect(() => {
    setShowSearchBar(!isHomepage);
    console.log('setHomepage');
    return () => {
      // if (!isHomepage) {
      //   setShowSearchBar(isHomepage);
      //   console.log('set not Homepage');
      // }
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // if (window.scrollY > 320) {
      //   setIsScrolled(true);
      // } else {
      //   setIsScrolled(false);
      // }
      if (!isHomepage || (window.scrollY > 320 && showSearchBar === false)) {
        setShowSearchBar(true);
      } else if (showSearchBar && window.scrollY < 320) {
        setShowSearchBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomepage, showSearchBar]);

  console.log('被渲染啦', pathname);
  const simulateLogin = () => {
    setLoginStatus(!loginStatus);
  };

  return (
    <Box
      width={'100%'}
      // borderBottom={'1px solid'}
      pt={2}
      pb={isScrolled ? 1 : 2}
      sx={{
        transition: '0.2s',
      }}
    >
      <Grid
        container
        maxWidth="lg"
        px={1}
        sx={{
          zIndex: 1,
          marginX: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
        }}
      >
        <Grid
          item
          px={2}
        >
          <LogoButton />
        </Grid>

        {showSearchBar && (
          <Grid
            item
            px={2}
            xs={4}
            sm={true}
            md={4}
          >
            <NaviTopSearchBar
              sx={{
                borderRadius: 2,
              }}
              text={'Search Everything'}
            />
          </Grid>
        )}

        {/* places-tab. in middle */}
        {!isSearAttrPage && (
          <Grid
            item
            xs
            px={2}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
              display: showSearchBar ? { xs: 'none', lg: 'revet' } : { xs: 'none', md: 'revet' },
            }}
          >
            <PlacesTab />
          </Grid>
        )}

        {/* right top corner. different display with different login state */}
        <Grid
          item
          // lg={showSearchBar ? 2 : 2}
          // px={2}
          xs={2}
        >
          <AccountButton
            loginStatus={loginStatus}
            simulateLogin={simulateLogin}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
