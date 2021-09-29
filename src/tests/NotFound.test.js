import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../uteis/renderWithRouter';
import NotFound from '../components/NotFound';

describe('testando o NotFound', () => {
  it('testando se tem um h2 no heading', () => {
    renderWithRouter(<NotFound />);
    const found = screen
      .getByRole('heading', { level: 2, name: 'Page requested not found Crying emoji' });
    expect(found).toBeInTheDocument();
  });

  it('teste que a pagina mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
