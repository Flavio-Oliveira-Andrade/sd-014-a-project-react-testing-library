import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Req 4 - NotFound.js', () => {
  test('checks if the page renders a "h2" tag with the especific text', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/invalid-route');
    expect(screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
      exact: false,
    })).toBeInTheDocument();
  });

  test('Checks if crying pikachu GIF is rendered', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/invalid-route');
    const pikachuCryingGif = screen.getByRole('img', {
      name: /pikachu crying/i,
      exact: false,
    });
    const pathImagePikachuCryng = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(pikachuCryingGif).toHaveAttribute('src', pathImagePikachuCryng);
  });
});
