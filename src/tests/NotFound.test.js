import React from 'react';
import { render, screen } from '@testing-library/react';

import { NotFound } from '../components';
import renderWithRouter from './Util/RenderWithRouter';

describe('Verifica página notFound', () => {
  it('Verifica se a página contém um heading "h2"', () => {
    render(<NotFound />);

    const notfoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notfoundText).toBeInTheDocument();
  });
  it('Verifica se a página contém uma imagem específica', () => {
    renderWithRouter(<NotFound />);

    const imageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const gifNotfound = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    expect(gifNotfound).toHaveAttribute('src', imageLink);
  });
});
