import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from '../components';

// https://testing-library.com/docs/example-react-router/#reducing-boilerplate
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Testa o componente <NotFound.js />', () => {
  test('Testa se página contém um heading h2 com o'
    + ' texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('Testa se a pagina mostra uma imagem especifica', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getByAltText('Pikachu crying because the'
      + ' page requested was not found');
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(notFoundImg).toBeInTheDocument();
  });
});
