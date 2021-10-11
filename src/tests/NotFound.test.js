import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste do componente Not found', () => {
  beforeEach(() => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <NotFound />
      </Router>,
    );
  });

  it('Exibe um heading h2 com texto "Page requested not found"', () => {
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /page requested not found/i,
      }),
    ).toBeInTheDocument();
  });

  it('Exibe uma imagem de Pikachu chorando', () => {
    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
