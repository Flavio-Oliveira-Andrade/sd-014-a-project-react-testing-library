import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('O primeiro link deve possuir o texto Home', () => {
  test('deve renderizar o componente Home', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('deve renderizar o componente About', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('deve renderizar o componente Favorites', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/favorite/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
