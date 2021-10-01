import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter/renderWithRouter';

describe('testa o component App e seus links', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('testa os links pela posição da classe', () => {
    const links = screen.getAllByRole('link');
    expect(links[0].href).toBe('http://localhost/');
    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].href).toBe('http://localhost/about');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].href).toBe('http://localhost/favorites');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });
});
