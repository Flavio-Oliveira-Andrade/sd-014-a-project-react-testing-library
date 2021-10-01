import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  test('página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const phrase = /Page requested not found/i;
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altText = 'Pikachu crying because the page requested was not found';
    const heading = screen.getByText(phrase);
    const image = screen.getByAltText(altText);
    expect(heading).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(src);
  });
});
