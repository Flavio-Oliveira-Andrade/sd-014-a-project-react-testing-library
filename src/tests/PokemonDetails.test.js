import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

describe('Requisito 7', () => {
  test('A página deve conter <name> Details, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    const link = screen.getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    expect(screen.getByRole('heading',
      {
        name: `${pokemons[8].name} Details`,
      })).toBeInTheDocument();
  });

  test('A imagem da localização deve ter atributo src com a URL da localização', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    const link = screen.getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    const imageLocation = screen.getAllByRole('img',
      {
        name: 'Dragonair location',
      });
    expect(imageLocation[0].src).toBe('https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png');
    expect(imageLocation[0]).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com "Game Locations of <name>"'
    + 'onde <name> é o nome do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    const link = screen.getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    const gameLocation = screen.getByRole('heading',
      {
        level: 2,
        name: 'Game Locations of Dragonair',
      });
    expect(gameLocation).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    const link = screen.getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    const summary = screen.getByRole('heading',
      {
        level: 2,
        name: 'Summary',
      });
    expect(summary).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico'
  + 'sendo visualizado', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    const link = screen.getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    const pokemonParagraph = screen.getByText(
      /They say that if it emits an aura from its whole body/i,
      +/the weather will begin to change instantly/i,
    );
    expect(pokemonParagraph).toBeInTheDocument();
  });

  test('O label do checkbox deve conter o texto "Pokémon favoritado?"', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    const link = screen.getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
  });
});
