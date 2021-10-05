import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

const imageAddress = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
const AtlText = 'Pikachu crying because the page requested was not found';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('Testa a página NotFound', () => {
  it('Testa se página tem um heading h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByText(/Page requested not found/i);
    expect(h2).toBeInTheDocument();
  });
  it('Testa se o pikachu está chorando', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', { name: AtlText });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imageAddress);
  });
});
