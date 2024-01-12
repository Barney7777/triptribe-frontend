import React from 'react';
import { render, screen } from '@testing-library/react';
import HomepageCard from '../HomepageCard';

describe('HomepageCard component', () => {
  const defaultProps = {
    imageSrc: '/assets/operahouse01.png',
    title: 'Test Title',
    comment: 'Test Comment',
    rating: 3,
  };

  test('renders HomepageCard component with provided props', () => {
    render(<HomepageCard {...defaultProps} />);

    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();

    const commentElement = screen.getByText('Test Comment');
    expect(commentElement).toBeInTheDocument();

    const imageElement = screen.getByAltText('Test Title');
    expect(imageElement).toBeInTheDocument();

    const ratingElement = screen.getByRole('img', { name: /3 Stars/ });

    const ratingValue = ratingElement.getAttribute('aria-label');

    expect(ratingValue).toBe('3 Stars');
  });
});
