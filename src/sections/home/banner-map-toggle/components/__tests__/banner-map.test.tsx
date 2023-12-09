// use next-router-mock package
import mockRouter from 'next-router-mock';
import { fireEvent, render, screen } from '@testing-library/react';
import { BannerMap } from '../banner-map';
// use next-router-mock to mock next router
jest.mock('next/router', () => jest.requireActual('next-router-mock'));
// use mockRouter to manage router

// need to find a way to mock the map component
jest.mock('@/components/map', () => ({
  __esModule: true,
  Map: jest.fn((props) => <div data-testid="mocked-map" />),
}));

describe('Banner Map', () => {
  describe('Close Button', () => {
    it('will update URL', () => {
      render(<BannerMap />);
      const closeButton = screen.getByRole('button', { name: 'Close Map' });
      fireEvent.click(closeButton);
      expect(mockRouter.query['map']).not.toBe('shown');
    });
    // it('will update URL', () => {});
  });
  describe('Map rendering', () => {
    it('will be rendered on the component', () => {
      render(<BannerMap />);
      const map = screen.getByTestId('mocked-map');
      expect(map).toBeInTheDocument();
    });
  });
});
