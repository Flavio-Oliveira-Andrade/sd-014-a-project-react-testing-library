import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando NotFound.js', () => {
  test('Verifica se a página contem o titulo "Page requested not found😭"', () => {
    const { history } = renderWithRouter(<NotFound />);

    history.push('/qualquer-coisa');

    const titleNotFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(titleNotFound).toBeInTheDocument();
  });
  test('Verifca se a pagina contem o gif', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const gif = screen.getByRole('img', {
      name: /pikachu crying because/i,
    });
    expect(gif).toBeInTheDocument();
    expect(gif).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
