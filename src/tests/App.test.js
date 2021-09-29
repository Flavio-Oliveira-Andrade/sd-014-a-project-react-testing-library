import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Requirement - 1', () => {
  it('have fixed navigation links in top of page', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Favorite Pokémons' })).toBeInTheDocument();
  });
  it('render initial path in "/" and go to "/" when click in Home link', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(history.location.pathname).toBe('/');
  });
  it('go to "/about" path when click in About link', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    expect(history.location.pathname).toBe('/about');
  });
  it('go to "/favorites" path when click in Favorite Pokémons link', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    expect(history.location.pathname).toBe('/favorites');
  });
  it('go to NotFound page when go to unknown path', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    history.push('XABLAU');
    expect(history.location.pathname).toBe('/XABLAU');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
