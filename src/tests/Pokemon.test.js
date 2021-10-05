import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
};

describe('Testa componente Pokemon', () => {
  test('Testa se é renderizado um card com informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ false }
      isFavorite
    />);
    const nomePokemon = screen.getByTestId(/pokemon-name/i);
    expect(nomePokemon).toBeInTheDocument();
    expect(nomePokemon).toHaveTextContent(pokemon.name);

    const tipoPokemon = screen.getByTestId('pokemon-type').innerHTML;
    expect(tipoPokemon).toBe('Electric');

    const pesoPok = `Average weight: ${pokemon
      .averageWeight.value} ${pokemon.averageWeight.measurementUnit}`;
    const averagePok = screen.getByTestId('pokemon-weight');
    expect(averagePok).toBeInTheDocument();
    expect(averagePok).toHaveTextContent(pesoPok);

    const imagemPok = screen.getByAltText(/sprite/i);
    expect(imagemPok).toHaveAttribute('src', pokemon.image);
    expect(imagemPok).toHaveAttribute('alt', `${pokemon.name} sprite`);
  });
  test('Verifica se o card do Pokémon indicado contém um link(More details)', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });
  test('Testa se ao clicar no Pokémon é redirecionado para pag. de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: `${pokemon.name} Details`,
    });
    expect(heading).toBeInTheDocument();
  });
  test('Verifica se a URL exibida no navegador muda para /pokemon/<id> ', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ false }
      isFavorite
    />);
    const infoPok = screen.getByRole('link', { name: /more details/i });
    expect(infoPok).toBeInTheDocument();
    userEvent.click(infoPok);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });
  test('Verifica se existe um ícone de estrela nos Pokémons favoritados ', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ false }
      isFavorite
    />);
    const marcaFavorito = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(marcaFavorito).toHaveAttribute('src', '/star-icon.svg');
  });
});
