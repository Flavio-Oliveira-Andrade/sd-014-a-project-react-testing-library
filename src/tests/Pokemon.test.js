import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../utils/renderWithRouter';

const IMG_PIKACHU = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

describe('Teste o componente <Pokemon />', () => {
  it('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/pokemons/25');
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(screen.getByTestId('pokemon-type').textContent).toBe('Electric');
    expect(screen.getByText(/6.0 kg/i));
    const img = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(img).toHaveAttribute('src', IMG_PIKACHU);
  });

  it('se ao clicar no link de navegação do Pokémon,'
    + 'é feito o redirecionamento da aplicação para'
    + 'a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));
    const imgStar = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
