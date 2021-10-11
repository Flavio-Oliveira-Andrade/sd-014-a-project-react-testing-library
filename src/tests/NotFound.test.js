import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 04 Not Found', () => {
  it('Deve conter um heading h2', () => {
    renderWithRouter(<NotFound />);
    const headh2 = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(headh2).toBeInTheDocument();
  });

  it('Deve aparecer uma imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

// requisito feito com a ajuda do repositorio do colega Rafael Frasson
// link: https://github.com/tryber/sd-014-a-project-react-testing-library/pull/110/commits/7632fa5ed693e67c01e5a5417f459242dbc70ad8
