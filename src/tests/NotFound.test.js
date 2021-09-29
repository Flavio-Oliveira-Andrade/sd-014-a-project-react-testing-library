import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import NotFound from '../components/NotFound';

const IMAGE_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
const ALT_TEXT = 'Pikachu crying because the page requested was not found';

describe('Testa o componente <NotFound.js />', () => {
  test('Teste se existe um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', { level: 2, name: /Page requested not found/i }));
  });

  test('Testa se página mostra a imagem necessária', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByAltText(ALT_TEXT)).toHaveAttribute('src', IMAGE_URL);
  });
});
