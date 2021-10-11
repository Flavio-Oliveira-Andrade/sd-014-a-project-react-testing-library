import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o componente <Pokemon />', () => {
  test('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const pokemon = screen.getByTestId('pokemon-name');
    const pkmnType = screen.getByTestId('pokemon-type');
    const pkmnMeasurements = screen.getByTestId('pokemon-weight');
    const pkmnAlt = screen.getByAltText('Pikachu sprite');

    expect(pokemon).toHaveTextContent('Pikachu');
    expect(pkmnType).toHaveTextContent('Electric');
    expect(pkmnMeasurements).toHaveTextContent('Average weight: 6.0 kg');
    expect(pkmnAlt).toBeInTheDocument();
    expect(pkmnAlt).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('O card do Pokémon indicado na Pokédex contém um link de navegação para '
  + 'exibir detalhes deste Pokémon. O link deve possuir a '
  + 'URL /pokemons/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText('More details');
    expect(detailsLink.href).toContain('pokemons/25');
  });
  test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
