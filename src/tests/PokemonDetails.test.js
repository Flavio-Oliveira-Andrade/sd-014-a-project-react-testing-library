import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

let link;
beforeEach(() => {
  renderWithRouter(<App />);
  link = screen.getByRole('link', {
    name: 'More details',
  });
  expect(link).toBeInTheDocument();
  userEvent.click(link);
});

describe('Teste se as informações detalhadas são mostradas na tela', () => {
  const pokemonTest = pokemons[0];
  const { name, summary } = pokemonTest;
  test('A página deve conter um texto <name> Details', () => {
    const nameText = screen.getByText(`${name} Details`);
    expect(nameText).toBeInTheDocument();
  });
  test('Não deve existir o link de navegação', () => {
    expect(link).not.toBeInTheDocument();
  });
  test('conter um heading h2 com o texto Summary', () => {
    const summaryElement = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryElement).toBeInTheDocument();
  });
  test('parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
    const paragraph = screen.getByText(summary);
    expect(paragraph).toBeInTheDocument();
  });
});

describe('seção com os mapas contendo as localizações do pokémon', () => {
  const pokemonTest = pokemons[0];
  const { name, foundAt } = pokemonTest;
  test('deverá existir um heading h2 com o texto Game Locations of <name', () => {
    const gameLocations = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(gameLocations).toBeInTheDocument();
  });
  test('Todas as localizações e mapa do Pokémon devem ser mostradas', () => {
    const allImages = screen.getAllByRole('img');
    const LENGHT_MAP = foundAt.length;
    foundAt.forEach(({ location, map }, idx) => {
      const locationText = screen.getByText(location);
      const { src, alt } = allImages[idx + 1];
      expect(locationText).toBeInTheDocument();
      expect(src).toBe(map);
      expect(alt).toBe(`${name} location`);
    });
    expect(allImages).toHaveLength(LENGHT_MAP + 1);
  });
});

describe('Teste se o usuário pode favoritar um pokémon', () => {
  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const checkboxButton = screen.getByRole('checkbox');
    expect(checkboxButton).toBeInTheDocument();
  });
  test('Cliques alternados no checkbox devem adicionar e remover', () => {
    const checkboxButton = screen.getByRole('checkbox');
    userEvent.click(checkboxButton);
    const favImage = screen.getAllByRole('img')[1];
    expect(favImage).toBeInTheDocument();
    userEvent.click(checkboxButton);
    expect(favImage).not.toBeInTheDocument();
  });
});
