import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import App from '../App';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

const pokemonInfo = {
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

const nameId = 'pokemon-name';
const typeId = 'pokemon-type';
const weightId = 'pokemon-weight';
const pikachuImg = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
const AtlText = 'Pikachu sprite';
const { name, id } = pokemonInfo;

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonInicial = screen.getByTestId(nameId);
    expect(pokemonInicial).toHaveTextContent(/pikachu/i);

    const pokemonType = screen.getByTestId(typeId);
    expect(pokemonType).toHaveTextContent(/electric/i);

    const pokemonWeight = screen.getByTestId(weightId);
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImg = screen.getByRole('img', { name: AtlText });
    expect(pokemonImg.src).toBe(pikachuImg);
  });

  it('Testa se o card do Pokémon contém um link com endereço correto', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText(/details/);
    expect(linkDetails).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(linkDetails);
    expect(window.location.href).toBe(`http://localhost/pokemons/${id}`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonInfo } isFavorite />);

    const favIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favIcon).toBeInTheDocument();
    expect(favIcon.src).toBe('http://localhost/star-icon.svg');
    expect(favIcon).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
