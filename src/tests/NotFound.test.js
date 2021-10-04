import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import RenderWithRouter from '../util/RenderWithRouter';

describe('testando o <NotFound />', () => {
  test('testando se existe um h2', () => {
    RenderWithRouter(<NotFound />);
    const getTextoNotfound = screen.getByText(/Page requested not found/i);
    expect(getTextoNotfound).toBeInTheDocument();
  });
  test('verificando img', () => {
    RenderWithRouter(<NotFound />);
    const imgNotFound = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
