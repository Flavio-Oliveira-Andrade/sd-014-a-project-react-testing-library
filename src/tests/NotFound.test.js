import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto'
  + '"Page requested not found"', () => {
    const { history } = renderWithRouter(<NotFound />);

    history.push('/pagina não encontrada');

    const notFoundtext = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFoundtext).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { history } = renderWithRouter(<NotFound />);

    history.push('/pagina não encontrada');

    const gifPokemon = screen.getByAltText(/Pikachu crying because the page/i);

    expect(gifPokemon).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
