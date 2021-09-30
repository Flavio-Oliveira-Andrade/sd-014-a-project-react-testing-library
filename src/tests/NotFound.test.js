import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa o funcionamento da página "Not Found"', () => {
  test('Testa se a página tem um heading', () => {
    render(<NotFound />);
    const notFoundHeading = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(notFoundHeading).toBeInTheDocument();
  });

  test('', () => {
    render(<NotFound />);
    // https://testing-library.com/docs/queries/byrole/
    const notFoundImage = screen.getByAltText('Pikachu crying because the page'
    + ' requested was not found');
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(notFoundImage).toBeInTheDocument();
  });
});
