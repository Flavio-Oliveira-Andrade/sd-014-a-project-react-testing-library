import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('renderizado um card com as informações de determinado pokémon.', () => {
  const pikachu = pokemons[0];

  it('é renderizado as informações no card Pokemon', () => {
    const { name, type } = pikachu;
    const { value, measurementUnit } = pikachu.averageWeight;

    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite={ false } />);

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(
      screen.getByText(`Average weight: ${value} ${measurementUnit}`),
    ).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image.src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(image.alt).toBe('Pikachu sprite');
  });

  it('contém um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const homePath = screen.getByText(/Home/i);
    fireEvent.click(homePath);

    const details = screen.getByText(/More details/i);
    fireEvent.click(details);

    const historyPath = history.location.pathname;
    expect(historyPath).toBe(`/pokemons/${pikachu.id}`);
  });

  test('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const favorite = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite`,
    });

    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
    expect(favorite).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
    expect(favorite).toBeInTheDocument();
  });
});
