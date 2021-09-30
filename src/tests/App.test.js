import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe ('O primeiro link deve possuir o texto Home', () => {
  test('deve renderizar o componente App', () => {
    const { getByText, history} = renderWithRouter( <App/> )
    fireEvent.click(getByText(/Home/i));
    const {pathname} = history.location;
    expect(pathname).toBe('/');
  });
  test('deve renderizar o componente About', () => {
    const { getByText, history} = renderWithRouter( <App/> )
    fireEvent.click(getByText(/about/i));
    const {pathname} = history.location;
    expect(pathname).toBe('/about');
  });
  test('deve renderizar o componente Favorites', () => {
    const { getByText, history} = renderWithRouter( <App/> )
    fireEvent.click(getByText(/favorite/i));
    const {pathname} = history.location;
    expect(pathname).toBe('/favorites');
  });
  
})

