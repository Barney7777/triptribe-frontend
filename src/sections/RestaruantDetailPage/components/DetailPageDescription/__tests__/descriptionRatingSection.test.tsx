import React from 'react';
import { screen, render } from '@testing-library/react';
import DetailPageDescription from '@/sections/RestaruantDetailPage/components/DetailPageDescription';

type RatingDistributionType = {
  count: number;
  rating: number;
};
jest.mock('../../../../rating-distribution', () => {
  return jest.fn(() => (
    <div data-testid="rating-card">
      <p>Mocked ratingDistributionCard</p>
    </div>
  ));
});
describe('rating distribution in description section of detail page', () => {
  const mockData: RatingDistributionType[] = [
    {
      count: 5,
      rating: 5,
    },
    {
      count: 6,
      rating: 4,
    },
    {
      count: 6,
      rating: 3,
    },
    {
      count: 6,
      rating: 2,
    },
    {
      count: 7,
      rating: 1,
    },
  ];
  it('renders DetailPageDescription with data', async () => {
    const { getByTestId } = render(
      <DetailPageDescription
        data={mockData}
        error={null}
        isLoading={false}
      />
    );
    console.log('here', document.body.innerHTML);
    const detailPageDescription = getByTestId('page-description');
    expect(detailPageDescription).toBeInTheDocument();
    const ratingCard = getByTestId('rating-card');
    expect(ratingCard).toBeInTheDocument();
  });
  it('renders Loading... when isLoading is true and data is empty array', () => {
    render(
      <DetailPageDescription
        data={[]}
        isLoading={true}
        error={null}
      />
    );
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });
  test('renders error message when error prop is provided', () => {
    const mockError = { response: { data: { exceptionMessage: 'Error message' } } };
    render(
      <DetailPageDescription
        data={[]}
        isLoading={false}
        error={mockError}
      />
    );
    const errorElement = screen.getByText('Error message');
    expect(errorElement).toBeInTheDocument();
  });
});
