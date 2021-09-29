import { fireEvent } from '@testing-library/dom';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '/App';

describe ('testando componente App', () => {
  test('deve renderizar o componente App', () => {
    const { getByText, history} = renderWithRouter(<App/>)
    fireEvent.click(getByText(/Home/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/Home');
    const home = getByText(/Home/);
    expect(home).toBeInTheDocument();
  });
  
})

