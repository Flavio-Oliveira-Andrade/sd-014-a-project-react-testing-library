import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('6º verifica o funcionamento do componente Pokemon', () => {
  it('Verifica se é renderizado um card com as informações do pokemon', () => {
    const boolFavorite = true;
    const { name, type, averageWeight, image } = pokemons[0];
    const { value, measurementUnit } = averageWeight;

    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ boolFavorite } />);

    const nameElement = screen.getByTestId('pokemon-name');
    const typeElement = screen.getByTestId('pokemon-type');
    const weightElement = screen.getByTestId('pokemon-weight');
    expect(nameElement).toHaveTextContent(name);
    expect(typeElement).toHaveTextContent(type);
    expect(weightElement).toHaveTextContent(`${value} ${measurementUnit}`);

    const imgElement = screen.getByRole('img', { name: `${name} sprite` });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', image);
  });
});
