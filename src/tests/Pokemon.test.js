import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações '
+ 'de determinado pokémon.', () => {
    renderWithRouter(
      <App />,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonAverageWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(/pikachu sprite/i);

    expect(pokemonName.innerHTML).toEqual('Pikachu');
    expect(pokemonType.innerHTML).toEqual('Electric');
    expect(pokemonAverageWeight.innerHTML).toEqual('Average weight: 6.0 kg');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação '
  + 'para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(
      <App />,
    );
    const pokemonDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(pokemonDetailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se ao clicar no link de navegação do Pokémon, '
    + 'é feito o redirecionamento da aplicação para a página '
    + 'de detalhes de Pokémon.', () => {
    renderWithRouter(
      <App />,
    );
    const pokemonDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetailsLink);
    const pokemonDetailsTitle = screen.getByRole('heading', {
      name: 'Pikachu Details',
    });

    expect(pokemonDetailsTitle).toBeInTheDocument();
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>,'
    + ' onde <id> é o id do Pokémon cujos detalhes se deseja ver.', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    const pokemonDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const pokemonDetailsTitle = screen.getByRole('heading', {
      name: 'Pikachu Details',
    });

    expect(pokemonDetailsTitle).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(
      <App />,
    );
    const pokemonDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetailsLink);
    const starMarked = screen.getByRole('checkbox');
    userEvent.click(starMarked);
    const imageAltTextPokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(imageAltTextPokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
