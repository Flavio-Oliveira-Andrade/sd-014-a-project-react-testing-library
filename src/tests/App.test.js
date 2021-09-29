import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente App', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const links = screen.getAllByRole('link');
    expect(links[0].href).toBe('http://localhost/');
    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].href).toBe('http://localhost/about');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].href).toBe('http://localhost/favorites');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });
});
