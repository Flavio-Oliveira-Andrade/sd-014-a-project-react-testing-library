import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound.js', () => {
  test('página contém um heading h2 com o texto Page requested not found 😭; ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2).toBeInTheDocument();
  });

  test('página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );

    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
