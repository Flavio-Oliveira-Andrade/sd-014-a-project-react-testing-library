import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

describe('Requisito 6', () => {
  test('É renderizado um card com as informações de determinado pokémon', () => {
    const setIs = App.setIsPokemonFavoriteById();
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIs }
      />,
    );
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const avgWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img');

    expect(pokeName).toHaveTextContent(pokemons[0].name);
    expect(pokeType).toHaveTextContent(pokemons[0].type);
    expect(avgWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg.alt).toBe(`${pokemons[0].name} sprite`);
  });
  test('O card do Pokémon indicado na Pokédex contém um link de navegação para '
  + 'exibir detalhes deste Pokémon. O link deve possuir a '
  + 'URL /pokemons/<id>, onde <id> é o id do Pokémon exibido', () => {
    const setIs = App.setIsPokemonFavoriteById();
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIs }
      />,
    );
    const link = screen.getByRole('link', {
      name: 'More details',
    });
    expect(link).toBeInTheDocument();
    expect(link.href).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
  });
  test('Ao clicar no link de navegação do Pokémon, é feito o '
  + 'redirecionamento da aplicação para a página de detalhes de Pokémon. '
  + 'A URL exibida no navegador muda para /pokemon/<id>, onde <id> '
  + 'é o id do Pokémon cujos detalhes se deseja ver '
  + 'E existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const btnFire = screen.getByRole('button', {
      name: 'Fire',
    });
    const link = screen.getByRole('link', {
      name: 'More details',
    });
    fireEvent.click(btnFire);
    fireEvent.click(link);

    const { pathname } = history.location;
    const header2 = screen.getByRole('heading', {
      name: `${pokemons[1].name} Details`,
    });

    expect(header2).toHaveTextContent('Charmander Details');
    expect(pathname).toBe(`/pokemons/${pokemons[1].id}`);

    const checkFavorite = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkFavorite);
    const imgFavorite = screen.getByAltText(`${pokemons[1].name} is marked as favorite`);

    expect(imgFavorite).toBeInTheDocument();
    expect(imgFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});
