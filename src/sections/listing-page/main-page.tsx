import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Card, CardMedia, Pagination, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ListingCard from '@/sections/listing-page/listing-card';
import SideDrawer from '@/sections/listing-page/side-drawer';
import {
  FilterChipData,
  FilterQueryParams,
  FilterQueryParamsSchema,
  ListingInfoBasic,
  MainType,
  QueryParamsSchema,
  QueryParamsType,
} from '@/types/general';
import ViewToggleButton from './button/view-toggle-button';
import FilterSortButton from './button/filter-sort-button';
import useRequest from '@/hooks/use-request';
import ListingList from './listing-list';
import HeroMap from './button/hero-map-button';
import FilterChips from './filter-chips';
import useRouterQuery from '@/hooks/use-router-query';
import FilterMatchInfo from './filter-match-info';
import SortSelect from './button/sort-select';
import Filter from './filter';
import { MapWithSideBarModal } from '@/components/map/map-with-sidebar';

interface MainPageProps {
  type: MainType;
}

const MainPage: FC<MainPageProps> = ({ type }) => {
  //url query params state
  const [queryParams, setQueryParams] = useState<QueryParamsType>({
    pageNumber: 1,
    distance: 0,
    cost: 0,
    open: false,
  });
  const { pageNumber } = queryParams;

  //setQueryParams for the first time enter the page
  const { isRouterReady, urlQuery, setUrlQuery, initUrlQuery } = useRouterQuery<QueryParamsType>();
  const parsedUrlQuery = QueryParamsSchema.parse(urlQuery);
  useEffect(() => {
    if (!isRouterReady) {
      return;
    }
    setQueryParams(parsedUrlQuery);
  }, [isRouterReady]);

  //set url on queryParams change
  useEffect(() => {
    if (!isRouterReady) {
      return;
    }
    setUrlQuery(queryParams);
  }, [isRouterReady, JSON.stringify(queryParams)]);

  //request listing data
  const { queryPath } = useRouterQuery();
  const resourceType = type === MainType.Restaurant ? 'restaurants' : 'attractions';
  const { data = [], isLoading } = useRequest<ListingInfoBasic[]>(
    queryPath ? { url: `/${resourceType}?${queryPath}` } : null
  );

  // get chipData: parsed from queryParams ->show chips
  const chipData: FilterChipData[] = [];
  const filterChipData = FilterQueryParamsSchema.parse(queryParams);
  for (const [key, value] of Object.entries(filterChipData)) {
    if (value === undefined || value === 0 || value == false) {
      continue;
    }
    if (Array.isArray(value)) {
      value.map((item) =>
        chipData.push({
          key: item,
          label: item,
          type: key as keyof FilterQueryParams,
        })
      );
    } else {
      chipData.push({
        key: key,
        label: `${key}: ${value.toString()}`,
        type: key as keyof FilterQueryParams,
      });
    }
  }

  //delete chips : undefined it from queryParams(so url change timely) and set filter-form value at the same time
  const { setValue, getValues, reset } = useFormContext<FilterQueryParams>();
  const formValue = getValues();
  const handleFilterChipsDelete = (chipToDelete: FilterChipData) => () => {
    setQueryParams((prev) => {
      let newData;
      if (Array.isArray(prev[chipToDelete.type])) {
        const prevData = [...(prev[chipToDelete.type] as string[])];
        newData = prevData?.filter((data) => data !== chipToDelete.key);
        return {
          ...prev,
          [chipToDelete.type]: newData,
        };
      } else {
        return {
          ...prev,
          [chipToDelete.type]: undefined,
        };
      }
    });
    const updateFilterOnChipDelete = (chipToDelete: FilterChipData) => {
      const filterFormValue = getValues();
      let newData;
      if (Array.isArray(filterFormValue[chipToDelete.type])) {
        const prevData = [...(filterFormValue[chipToDelete.type] as string[])];
        newData = prevData?.filter((data) => data !== chipToDelete.key);
        setValue(chipToDelete.type, newData);
      } else if (filterFormValue[chipToDelete.type] === 'open') {
        setValue('open', false);
      } else {
        setValue(chipToDelete.type, undefined);
      }
    };
    updateFilterOnChipDelete(chipToDelete);
  };

  //clear all filter
  const defaultValues = {
    meals: [],
    cuisine: [],
    type: [],
    duration: [],
    distance: 0,
    cost: 0,
    rating: '',
    open: false,
  };
  const clearAllFilter = () => {
    reset(defaultValues);
  };

  //drawer open and close function
  const [openSideDrawer, setOpenSideDrawer] = useState<boolean>(false);
  const handleFiltersToggle = () => {
    setOpenSideDrawer((prevState) => !prevState);
  };
  const handleCloseSideDrawer = () => {
    setOpenSideDrawer(false);
  };

  //view toggle function
  const [cardView, setCardView] = useState<boolean>(true);
  const handleViewToggle = () => {
    setCardView(!cardView);
  };

  //page number change function
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) =>
    setQueryParams((prev) => ({ ...prev, pageNumber: value }));

  //page results info
  const [pageResultsInfo, setPageResultsInfo] = useState('');
  const total = 30;
  const pageCount = 1;
  const pageSize = 30;
  const start = (pageNumber - 1) * pageSize + 1;
  useEffect(() => {
    if (pageNumber < pageCount) {
      const end = pageNumber * pageSize;
      setPageResultsInfo(`Showing  results ${start} - ${end} of ${total}`);
    } else {
      setPageResultsInfo(`Showing  results ${start} - ${total} of ${total}`);
    }
  }, [pageNumber, setPageResultsInfo, start]);

  // map modal
  const [mapIsOpen, setMapIsOpen] = useState(false);
  const toggleMapIsOpen = (state: boolean) => {
    setMapIsOpen(state);
  };
  return (
    <div>
      <SideDrawer
        open={openSideDrawer}
        onClose={handleCloseSideDrawer}
        type={type}
        setQueryParams={setQueryParams}
      />
      <Card
        elevation={2}
        sx={{ borderRadius: 1, height: 300, mt: 2 }}
      >
        <CardMedia
          image="https://drive.google.com/uc?export=view&id=13fBD9P9zs4ZO13Jm5kiusEfkYx8eezry"
          sx={{ height: '100%' }}
        />
      </Card>
      <Grid
        xs={12}
        container
        justifyContent="space-between"
        flexDirection="row"
      >
        <Grid
          container
          sx={{ display: { xs: 'none', lg: 'block' }, pr: 3, mt: 2 }}
          md={3}
        >
          <Grid>
            <Box sx={{ height: 100, mb: 2 }}>
              <HeroMap
                mapIsOpen={mapIsOpen}
                toggleMapIsOpen={toggleMapIsOpen}
              />
              <MapWithSideBarModal
                mapIsOpen={mapIsOpen}
                toggleMapIsOpen={toggleMapIsOpen}
              />
            </Box>
          </Grid>
          <Grid>
            <Card
              elevation={2}
              sx={{
                borderRadius: 1,
              }}
            >
              {!openSideDrawer && (
                <Filter
                  type={type}
                  setQueryParams={setQueryParams}
                />
              )}
            </Card>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={9}
          container
          justifyContent="flex-start"
          flexDirection="column"
        >
          <Grid
            container
            xs={12}
            sx={{ mt: 2, mb: 2 }}
            justifyContent="space-between"
            flexDirection="row"
          >
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={0}
              sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'center' }}
            >
              <Box sx={{ height: 100, width: '100%', mb: 1 }}>
                <HeroMap
                  mapIsOpen={mapIsOpen}
                  toggleMapIsOpen={toggleMapIsOpen}
                />
              </Box>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={0}
              sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'center' }}
            >
              <Box sx={{ width: '100%', mb: 1 }}>
                <FilterSortButton
                  handleFiltersToggle={handleFiltersToggle}
                  setQueryParams={setQueryParams}
                />
              </Box>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={6}
              sx={{ display: 'flex', justifyContent: 'flex-start', heigh: 20 }}
            >
              <Box>{chipData.length !== 0 && <FilterMatchInfo onClear={clearAllFilter} />}</Box>
            </Grid>
            <Grid
              xs={0}
              sm={0}
              md={0}
              lg={6}
              sx={{ display: { xs: 'none', lg: 'flex' }, justifyContent: 'flex-end', heigh: 20 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <SortSelect setQueryParams={setQueryParams} />
                <ViewToggleButton
                  handleViewToggle={handleViewToggle}
                  view={cardView}
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box>
                <FilterChips
                  chipData={chipData}
                  handleFilterChipsDelete={handleFilterChipsDelete}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
          >
            {(isLoading ? Array.from(new Array(12)) : data).map(
              (item: ListingInfoBasic, index: number) =>
                cardView ? (
                  <Grid
                    key={item ? item._id : index}
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
                          <Skeleton />
                          <Skeleton />
                        </Box>
                      </Box>
                    )}
                  </Grid>
                ) : (
                  <Grid
                    key={item ? item._id : index}
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
          {data.length > 0 && (
            <Grid
              xs={12}
              sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 4 }}
            >
              <Pagination
                count={pageCount}
                page={pageNumber}
                color="primary"
                onChange={handlePageChange}
              />
              <Typography
                variant="body1"
                color="text.secondary"
                fontSize={12}
                sx={{ marginY: 2 }}
              >
                {pageResultsInfo}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
