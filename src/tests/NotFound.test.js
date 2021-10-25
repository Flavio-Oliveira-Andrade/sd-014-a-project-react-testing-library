import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  beforeEach(() => renderWithRouter(<NotFound />));
  test('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const error404 = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(error404).toBeInTheDocument();
    const notFoundEmoji = screen.getByRole('img', { name: 'Crying emoji' });
    expect(notFoundEmoji).toBeInTheDocument();
  });
  test('se página mostra a imagem', () => {
    const imgLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', imgLink);
  });
});

// testttt
