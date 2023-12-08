import { MapItemCard } from '..';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  getByRole,
  getByTestId,
} from '@testing-library/react';
import { isOpening } from '@/utils/is-opening';
import { getCurrentWeekday } from '@/utils/get-current-date-time';
import tzlookup from 'tz-lookup';
import { CityProps } from '@/types/attractions-restaurants';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

const mockPopupInfo: CityProps = {
  _id: '65573aebb5ccb958b78ee39a',
  name: 'S 5th Street',
  description:
    'Universe aggredior suffoco calcar. Quisquam earum ipsam quis consequuntur acceptus alo victus. Vulnero corpus abbas sumptus tam anser versus traho patrocinor.',
  website: 'http://stained-thief.info',
  email: 'S5thStreet.DAmore@yahoo.com',
  phone: '956.841.0415 x234',
  openHours: {
    Monday: {
      isOpenAllDay: false,
      isClosed: false,
      period: [
        {
          openTime: '06:00',
          closeTime: '18:00',
        },
      ],
    },
    Tuesday: {
      isOpenAllDay: false,
      isClosed: false,
      period: [
        {
          openTime: '06:00',
          closeTime: '18:00',
        },
      ],
    },
    Wednesday: {
      isOpenAllDay: false,
      isClosed: false,
      period: [
        {
          openTime: '06:00',
          closeTime: '18:00',
        },
      ],
    },
    Thursday: {
      isOpenAllDay: false,
      isClosed: false,
      period: [
        {
          openTime: '06:00',
          closeTime: '18:00',
        },
      ],
    },
    Friday: {
      isOpenAllDay: false,
      isClosed: false,
      period: [
        {
          openTime: '06:00',
          closeTime: '18:00',
        },
      ],
    },
    Saturday: {
      isOpenAllDay: false,
      isClosed: false,
      period: [
        {
          openTime: '06:00',
          closeTime: '18:00',
        },
      ],
    },
    Sunday: {
      isOpenAllDay: false,
      isClosed: false,
      period: [
        {
          openTime: '06:00',
          closeTime: '18:00',
        },
      ],
    },
  },
  address: {
    formattedAddress: '536 Mueller Ferry Apt. 633',
    location: {
      lat: -57.8146,
      lng: 10.1117,
    },
  },
  overAllRating: 2.9,
  photos: [
    {
      imageAlt: 'Attraction photo 0',
      imageUrl: 'https://loremflickr.com/640/480/attraction?lock=3594513721327616',
      imageType: 'Attractions',
      uploadUserId: '65562edc184d4aa3bc1c52a7',
      _id: '65573aebb5ccb958b78ee39b',
    },
  ],
  createdUserId: '65562edc184d4aa3bc1c52a7',
  createdAt: '2023-11-17T10:05:31.866Z',
  updatedAt: '2023-11-17T10:05:58.127Z',
  __v: 0,
  distance: 5530835.474964879,
  type: 'Attractions',
};

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('@/utils/is-opening');
const mockIsOpening = jest.fn();
mockIsOpening.mockImplementation((popupInfo: CityProps) => 'Opening');
(isOpening as jest.Mock).mockImplementation(mockIsOpening);

jest.mock('@/utils/get-current-date-time');
const mockGetCurrentWeekday = jest.fn();
mockGetCurrentWeekday.mockImplementation(
  (timeZone: string, plusDay: number = 0, date?: any) => 'Monday'
);
(getCurrentWeekday as jest.Mock).mockImplementation(mockGetCurrentWeekday);

jest.mock('tz-lookup');
const mockTzlookup = jest.fn();
mockTzlookup.mockImplementation((lat: number, lng: number) => 'America/New_York');
(tzlookup as jest.Mock).mockImplementation(mockTzlookup);

const mockImageCompleteHandler = jest.fn();
mockImageCompleteHandler.mockImplementation((state) => {});

describe('Banner Map', () => {
  describe('Link', () => {
    it('is rendered on the page', () => {
      render(
        <MapItemCard
          imageComplete={true}
          imageCompleteHandler={mockImageCompleteHandler}
          popupInfo={mockPopupInfo}
        />
      );
      const placeImageLink = screen.getByRole('link', { name: 'S 5th Street' });
      expect(placeImageLink).toBeInTheDocument();
    });
  });
  describe('Skeleton', () => {
    it('is rendered when imageComplete is false ', () => {
      render(
        <MapItemCard
          imageComplete={false}
          imageCompleteHandler={mockImageCompleteHandler}
          popupInfo={mockPopupInfo}
        />
      );
      const imageSkeleton = screen.getByLabelText('Image Skeleton');
      expect(imageSkeleton).toBeInTheDocument();
    });
    it('is not rendered when imageComplete is true', () => {
      render(
        <MapItemCard
          imageComplete={true}
          imageCompleteHandler={mockImageCompleteHandler}
          popupInfo={mockPopupInfo}
        />
      );
      const imageSkeleton = screen.queryAllByLabelText('Image Skeleton');
      expect(imageSkeleton.length).toBe(0);
    });
  });
  describe('Image', () => {
    it('will be rendered on the page', () => {
      render(
        <MapItemCard
          imageComplete={true}
          imageCompleteHandler={mockImageCompleteHandler}
          popupInfo={mockPopupInfo}
        />
      );
      const placeImage = screen.getByRole('img', { name: 'S 5th Street' });
      expect(placeImage).toBeInTheDocument();
    });
    // it('will trigger the handler function when complete load', async () => {
    //   render(
    //     <MapItemCard
    //       imageComplete={true}
    //       imageCompleteHandler={mockImageCompleteHandler}
    //       popupInfo={mockPopupInfo}
    //     />
    //   );
    //   // const placeImage = screen.getByRole('img', { name: 'S 5th Street' });

    //   // 在 waitFor 的回调中进行断言
    //   await waitFor(() => expect(mockImageCompleteHandler).toHaveBeenCalled());
    // });
  });
  describe('Text', () => {
    it('will be rendered in page', () => {
      const { getByText, getByRole, getByLabelText } = render(
        <MapItemCard
          imageComplete={true}
          imageCompleteHandler={mockImageCompleteHandler}
          popupInfo={mockPopupInfo}
        />
      );
      const placeHeader = getByRole('heading', {
        name: 'S 5th Street, 536 Mueller Ferry Apt. 633',
      });
      expect(placeHeader).toBeInTheDocument();
      const placeRating = getByLabelText('3 Stars');
      expect(placeRating).toBeInTheDocument();
      const openingState = getByText('Opening');
      expect(openingState).toBeInTheDocument();
      const closeState = getByText('Close at 18:00');
      expect(closeState).toBeInTheDocument();
    });
  });
  describe('Edit Icon', () => {
    it('Should be rendered on the page', () => {
      const { getByTestId } = render(
        <MapItemCard
          imageComplete={true}
          imageCompleteHandler={mockImageCompleteHandler}
          popupInfo={mockPopupInfo}
        />
      );
      const editIcon = getByTestId('RateReviewIcon');
      expect(editIcon).toBeInTheDocument();
    });
    // it('Should be clicked to go to write review page', () => {
    //   const { getByTestId } = render(
    //     <MapItemCard
    //       imageComplete={true}
    //       imageCompleteHandler={mockImageCompleteHandler}
    //       popupInfo={mockPopupInfo}
    //     />
    //   );
    //   const editIcon = getByTestId('RateReviewIcon');
    //   fireEvent.click(editIcon, {
    //     bubbles: true,
    //     cancelable: true,
    //   });
    //   console.log(mockRouter);
    //   // expect(mockRouter.pathname)
    // });
  });
  describe('Favorite Icon', () => {
    it('Should be rendered on the page', () => {
      const { getByTestId } = render(
        <MapItemCard
          imageComplete={true}
          imageCompleteHandler={mockImageCompleteHandler}
          popupInfo={mockPopupInfo}
        />
      );
      const favoriteIcon = getByTestId('FavoriteBorderIcon');
      expect(favoriteIcon).toBeInTheDocument();
    });
    it('Should switch state after click', () => {
      const { getByTestId } = render(
        <MapItemCard
          imageComplete={true}
          imageCompleteHandler={mockImageCompleteHandler}
          popupInfo={mockPopupInfo}
        />
      );
      let favoriteIconBorder = getByTestId('FavoriteBorderIcon');
      fireEvent.click(favoriteIconBorder, {
        bubbles: true,
        cancelable: true,
      });
      const favoriteIcon = getByTestId('FavoriteIcon');
      expect(favoriteIcon).toBeInTheDocument();
      fireEvent.click(favoriteIcon, {
        bubbles: true,
        cancelable: true,
      });
      favoriteIconBorder = getByTestId('FavoriteBorderIcon');
      expect(favoriteIconBorder).toBeInTheDocument();
    });
  });
});
