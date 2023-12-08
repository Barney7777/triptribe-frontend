import { fireEvent, render, screen } from '@testing-library/react';
import { HeroBanner } from '..';
// use next-router-mock package
import mockRouter from 'next-router-mock';
// use next-router-mock to mock next router
jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Hero Banner', () => {
  describe('Image', () => {
    it('is rendered on the page', () => {
      render(<HeroBanner />);
      const bannerImage = screen.getByRole('img', { name: 'Banner Image' });
      expect(bannerImage).toBeInTheDocument();
    });
  });
  describe('map toggle button Button', () => {
    it('is rendered on the page', () => {
      render(<HeroBanner />);
      const mapToggleButton = screen.getByRole('button', { name: 'Map View' });
      expect(mapToggleButton).toBeInTheDocument();
    });
    it('is disabled after click', () => {
      render(<HeroBanner />);
      // const toggleMapLoadingHandlerMock = jest.fn();
      const mapToggleButton = screen.getByRole('button', { name: 'Map View' });
      fireEvent.click(mapToggleButton);
      expect(mapToggleButton).toBeDisabled();
    });
  });
  describe('Search Bar', () => {
    it('is rendered on the page', () => {
      render(<HeroBanner />);
      const searchBar = screen.getByPlaceholderText('Search');
      expect(searchBar).toBeInTheDocument();
    });
  });
});
