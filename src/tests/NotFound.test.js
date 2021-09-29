import React from 'react';
import {
  screen,
} from '@testing-library/react';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

test('se página contém um heading h2 com o texto "Page requested not found"', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/pageNotFound');

  const pageNotFound = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(pageNotFound).toBeInTheDocument();
});

test('se página mostra a imagem', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/pageNotFound');

  const imgPokedex = screen
    .getByAltText('Pikachu crying because the page requested was not found');
  expect(imgPokedex).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
