import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test of App', () => {
  it('should have three links', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/home/i);
    const about = screen.getByText(/about/i);
    const favorite = screen.getByText(/favorite/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('should be in page home', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('should be in page about', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('should be in page favorites', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/favorite/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('should be in page not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page/notfound');
    const notFoundText = screen.getByText(/not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
