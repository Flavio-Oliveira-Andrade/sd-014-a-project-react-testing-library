import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 7', () => {
  test('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const btnDragon = screen.getByRole('button', {
      name: 'Dragon',
    });
    const link = screen.getByRole('link', {
      name: 'More details',
    });
    fireEvent.click(btnDragon);
    fireEvent.click(link);

    const headerDetails = screen.getByRole('heading', {
      name: `${pokemons[8].name} Details`,
    });
    const headerSummary = screen.getByRole('heading', {
      name: 'Summary',
    });
    const paragraph = screen.getByText(/They say that if it emits an aura from its/i);

    expect(headerDetails).toHaveTextContent('Dragonair Details');
    expect(link).not.toBeInTheDocument();
    expect(headerSummary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
  test('Existe na página uma seção com os mapas contendo'
  + ' as localizações do pokémon.', () => {
    renderWithRouter(<App />);
    const btnBug = screen.getByRole('button', {
      name: 'Bug',
    });
    const link = screen.getByRole('link', {
      name: 'More details',
    });
    fireEvent.click(btnBug);
    fireEvent.click(link);

    const headerLocations = screen.getByRole('heading', {
      name: `Game Locations of ${pokemons[2].name}`,
    });
    const qtdLocations = screen.getAllByAltText(`${pokemons[2].name} location`);
    const { foundAt } = pokemons[2];
    foundAt.forEach(({ location, map }) => {
      const locationScreen = screen.getByText(location);
      const imgsLocation = screen.getAllByRole('img');
      const image = imgsLocation.find((img) => img.src === map);

      expect(locationScreen).toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(image.alt).toBe(`${pokemons[2].name} location`);
    });

    expect(headerLocations).toBeInTheDocument();
    expect(qtdLocations.length).toBe(foundAt.length);
  });
});
