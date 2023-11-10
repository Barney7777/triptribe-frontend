import { FC, useState } from 'react';
import { Box, Card, Pagination, Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import ListingCard from '@/sections/restaurant-attraction-page/listing-card';
import SideDrawer from '@/sections/restaurant-attraction-page/side-drawer';
import SearchBar from '@/sections/restaurant-attraction-page/searchbar';
import { ListingInfoBasic, MainType, PageDataResponse, QueryParamsType } from '@/types/general';
import RestaurantFilter from './restaurants/restaurant-filter';
import AttractionFilter from './attractions/attraction-filter';
import ViewToggleButton from './button/view-toggle-button';
import PageSizeSelect from './button/page-size-select';
import FilterMapButton from './button/filter-map-button';
import useRequest from '@/hooks/use-request';
import ListingList from './listing-list';

interface MainPageProps {
  type: MainType;
}

const MainPage: FC<MainPageProps> = ({ type }) => {
  const [queryParams, setQueryParams] = useState<QueryParamsType>({
    pageNumber: 1,
    pageSize: 12,
  });
  const { pageNumber, pageSize } = queryParams;
  const resourceType = type === MainType.Restaurant ? 'restaurants' : 'attractions';
  const { data: { data = [], pageCount } = {}, isLoading } = useRequest<
    PageDataResponse<ListingInfoBasic[]>
  >({
    url: `/${resourceType}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  });

  console.log('data: ', data);

  const handleQueryParamsChange = (param: keyof QueryParamsType, value: number) => {
    setQueryParams((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  const [openSideDrawer, setOpenSideDrawer] = useState<boolean>(false);
  const handleFiltersToggle = () => {
    setOpenSideDrawer((prevState) => !prevState);
  };
  const handleCloseSideDrawer = () => {
    setOpenSideDrawer(false);
  };
  const [listView, setListView] = useState<boolean>(true);
  const handleViewToggle = () => {
    setListView(!listView);
  };

  return (
    <div className="flex justify-center ">
      <div className="w-[1640px] relative flex flex-col items-center p-2">
        <Box
          component="section"
          sx={{ position: 'sticky', top: 0, width: '100%', zIndex: 1300 }}
        >
          <SearchBar />
        </Box>

        <SideDrawer
          open={openSideDrawer}
          onClose={handleCloseSideDrawer}
          type={type}
        />
        <Grid
          xs={12}
          container
          justifyContent="space-between"
          flexDirection="row"
        >
          <Grid
            sx={{ display: { xs: 'none', lg: 'block' }, pr: 3, mt: 11 }}
            md={3}
          >
            <Card
              elevation={4}
              sx={{
                borderRadius: 4,
              }}
            >
              {type === MainType.Restaurant && <RestaurantFilter />}
              {type === MainType.Attraction && <AttractionFilter />}
            </Card>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={9}
            container
            spacing={2}
            justifyContent="flex-start"
            flexDirection="column"
          >
            <Grid
              container
              xs={12}
              sx={{ mt: 2 }}
              justifyContent="space-between"
              flexDirection="row"
            >
              <Grid
                xs={6}
                sm={6}
                md={6}
                lg={0}
                sx={{ display: { xs: 'flex', lg: 'none' } }}
              >
                <Box>
                  <FilterMapButton handleFiltersToggle={handleFiltersToggle} />
                </Box>
              </Grid>
              <Grid
                xs={6}
                sm={6}
                md={6}
                lg={12}
                sx={{ display: 'flex', justifyContent: 'flex-end', heigh: 20 }}
              >
                <PageSizeSelect
                  handleQueryParamsChange={handleQueryParamsChange}
                  pageSize={pageSize}
                />
                <ViewToggleButton
                  handleViewToggle={handleViewToggle}
                  view={listView}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
            >
              {(isLoading ? Array.from(new Array(pageSize)) : data).map((item, index) =>
                !listView ? (
                  <Grid
                    key={item ? item.id : index}
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    {item ? (
                      <ListingCard
                        listingCardInfo={item}
                        type={type}
                      />
                    ) : (
                      <Box sx={{ mb: 1.5 }}>
                        <Skeleton
                          variant="rectangular"
                          height={200}
                          sx={{ borderRadius: 2 }}
                        />
                        <Box sx={{ pt: 0.5 }}>
                          <Skeleton width="30%" />
                          <Skeleton width="50%" />
                          <Skeleton />
                          <Skeleton />
                        </Box>
                      </Box>
                    )}
                  </Grid>
                ) : (
                  <Grid
                    key={item ? item.id : index}
                    xs={12}
                  >
                    {item ? (
                      <ListingList
                        listingInfo={item}
                        type={type}
                      />
                    ) : (
                      <Box sx={{ borderRadius: 4, height: 200, mb: 2 }}>
                        <Grid
                          container
                          sx={{ display: 'flex', flexDirection: 'row' }}
                        >
                          <Grid xs={4}>
                            <Skeleton
                              variant="rectangular"
                              height={200}
                              sx={{ borderRadius: 2 }}
                            />
                          </Grid>
                          <Grid xs={8}>
                            <Box sx={{ ml: 2, mt: 2 }}>
                              <Skeleton width="30%" />
                              <Skeleton width="50%" />

                              <Skeleton
                                variant="rectangular"
                                height={130}
                                sx={{ borderRadius: 2 }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Grid>
                )
              )}
            </Grid>
            <Grid
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              {data.length > 0 && (
                <Pagination
                  count={pageCount}
                  page={pageNumber}
                  color="primary"
                  onChange={(_, value: number) => {
                    handleQueryParamsChange('pageNumber', value);
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MainPage;
