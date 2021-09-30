import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

const mockPokemon = {
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

const beforeEachDetails = () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByText(/more details/i);
    fireEvent.click(detailsButton);
  });
};

describe('teste o componente PokemonDetails', () => {
  describe('Teste se os detalhes do Pokémon selecionado são mostrados na tela', () => {
    beforeEachDetails();

    test('A página deve conter um texto Pokemon Details', () => {
      const pokemonName = screen.getByText(`${mockPokemon.name} Details`);
      expect(pokemonName).toBeInTheDocument();
    });

    test('Não deve existir o link de nav para os detalhes do Pokémon selecionado', () => {
      const linkButtons = screen.getAllByRole('link');
      linkButtons.forEach((linkButton) => {
        expect(linkButton).not.toHaveAttribute('href', '/pokemon/25');
      });
    });

    test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const sumary = screen.getByRole('heading', {
        name: 'Summary',
        level: 2,
      });
      expect(sumary).toBeInTheDocument();
    });

    test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
      const paragraph = screen.getByText(/This intelligent Pokémon roasts/i);
      expect(paragraph).toBeInTheDocument();
    });
  });
  describe('Teste se tem seção com os mapas contendo as localizações do pokémon', () => {

  });
});
