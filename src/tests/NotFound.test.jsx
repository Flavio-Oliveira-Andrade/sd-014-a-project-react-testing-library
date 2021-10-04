import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('página contém um heading com o texto Page requested not found ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );

    const head = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(head).toBeInTheDocument();
  });

  it('ver se a imagem é mostrada', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );

    const imagem = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imagem).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
