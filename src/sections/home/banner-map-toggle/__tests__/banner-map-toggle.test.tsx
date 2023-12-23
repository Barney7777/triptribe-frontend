import { BannerMapToggle } from '@/sections/home/banner-map-toggle';
import { render, screen, fireEvent } from '@testing-library/react';
// use next-router-mock package
import mockRouter from 'next-router-mock';
// use next-router-mock to mock next router
jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('@/components/map', () => ({
  __esModule: true,
  Map: jest.fn((props) => <div data-testid="mocked-map" />),
}));

describe('BannerMapToggle', () => {
  describe('Rendering', () => {
    it('when showMap is true, map component is rendered on the page', () => {
      mockRouter.query['map'] = 'shown';
      render(<BannerMapToggle mapQueryShown={true} />);
      const closeButton = screen.getByTestId('CloseIcon');
      expect(closeButton).toBeInTheDocument();

      const mapElement = screen.getByTestId('mocked-map');
      expect(mapElement).toBeInTheDocument();
    });

    it('when showMap is false, hero banner is rendered on the page', () => {
      const { map, ...rest } = mockRouter.query;
      mockRouter.query = rest;

      render(<BannerMapToggle mapQueryShown={false} />);
      const mapViewButton = screen.getByRole('button', { name: 'Map View' });
      expect(mapViewButton).toBeInTheDocument();
      const heroBannerSearchBar = screen.getByPlaceholderText('Search');
      expect(heroBannerSearchBar).toBeInTheDocument();
    });
  });

  describe('User Action', () => {
    describe('map toggle', () => {
      it('will render map component when click view map button', () => {
        render(<BannerMapToggle mapQueryShown={false} />);

        fireEvent.click(screen.getByRole('button', { name: 'Map View' }));

        const closeButton = screen.getByTestId('CloseIcon');
        expect(closeButton).toBeInTheDocument();
        const mapElement = screen.getByTestId('mocked-map');
        expect(mapElement).toBeInTheDocument();
      });
      it('will render hero banner component when click close button', () => {
        render(<BannerMapToggle mapQueryShown={true} />);

        fireEvent.click(screen.getByRole('button', { name: 'Close Map' }));

        const mapViewButton = screen.getByRole('button', { name: 'Map View' });
        expect(mapViewButton).toBeInTheDocument();
        // need a searchbar
        const heroBannerSearchBar = screen.getByPlaceholderText('Search');
        expect(heroBannerSearchBar).toBeInTheDocument();
      });
    });
  });
});
