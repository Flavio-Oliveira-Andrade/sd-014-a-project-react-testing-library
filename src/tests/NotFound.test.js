import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';

describe('Teste do componente <NotFound.js />', () => {
  it('Verifica se página contém um heading h2 com o'
  + ' texto "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const pageNotFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(pageNotFoundText).toBeInTheDocument();
  });
  it('Verifica se página mostra a imagem', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const pageNotFoundImage = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(pageNotFoundImage).toBeInTheDocument();
  });
});
