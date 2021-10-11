import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste do componente Not found', () => {
  it('Exibe um heading h2 com texto "Page requested not found"', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <NotFound />
      </Router>,
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /page requested not found/i,
      }),
    ).toBeInTheDocument();
  });

  it('Exibe uma imagem de Pikachu chorando', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <NotFound />
      </Router>,
    );

    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(img).toBeInTheDocument();
  });
});
