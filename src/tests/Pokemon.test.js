import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';
import App from '../App';

describe('Testes do requisito 6', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');
    const weightPokemon = screen.getByText('Average weight: 6.0 kg');
    expect(weightPokemon).toBeInTheDocument();
    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const moreDetails = screen.getByText(/More Details/i);
    expect(moreDetails.href).toContain('pokemons/25');
  });

  it('Testa se é feito o redirecionamento para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const namePokemon = screen.getByText('Pikachu');
    const buttonDetails = screen.getByText('More details');

    expect(namePokemon).toBeInTheDocument();
    userEvent.click(buttonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const imgStar = screen.getByRole('img', {
      name: /is marked as favorite/i,
    });
    expect(imgStar).toBeInTheDocument();
    expect(imgStar.src).toMatch(/star-icon.svg/i);
    expect(imgStar.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
