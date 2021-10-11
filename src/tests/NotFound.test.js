import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './helper/renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound component test', () => {
  test('should contain a heading with the text "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);

    const pageNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
      value: 2,
    });
    expect(pageNotFound).toBeInTheDocument();
  });

  test('should render a specific image URL', () => {
    renderWithRouter(<NotFound />);

    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const image = screen.getByRole('img', {
      name: /pikachu crying/i,
    });
    expect(image).toBeInTheDocument();
    // https://react-test.dev/#tohaveattribute
    expect(image).toHaveAttribute('src', URL);
  });
});
