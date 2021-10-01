import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound />', () => {
  test('Testa se a página contém um heading h2 com o texto "Page requested not found 😭"',
    () => {
      renderWithRouter(<NotFound />);

      const h2Text = screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/,
      });

      expect(h2Text).toBeInTheDocument();
    });
  test('Testa se a página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);

    const notFoundImage = screen.getByAltText('Pikachu crying because the page'
    + ' requested was not found');

    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
