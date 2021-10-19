import React from 'react';
import { screen } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../render/renderWithRouter';
import App from '../App';

const paginaDetalhePokemonURL = '/pokemons/25';

describe('Testa se aplicação é renderizada para o componente PokemonDetails.', () => {
  test('Se a página deve conter um texto <name> Details,'
  + 'onde <name> é o nome do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(paginaDetalhePokemonURL);
    const detalhesPokemonH2 = screen.getByRole('heading',
      {
        name: `${pokemons[0].name} Details`,
        level: 2,
      });
    expect(detalhesPokemonH2).toBeInTheDocument();
  });

  test('Se a imagem da localização deve ter um atributo src'
  + 'com a URL da localização', () => {
    const { history } = renderWithRouter(<App />);
    history.push(paginaDetalhePokemonURL);
    const imagemTextPikachuLocation = screen.getAllByRole('img',
      {
        name: 'Pikachu location',
      });
    expect(imagemTextPikachuLocation[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imagemTextPikachuLocation[0]).toBeInTheDocument();
  });

  test('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of'
  + '<name> onde <name> é o nome do Pokémon exibido.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(paginaDetalhePokemonURL);
    const textGameLocationsPikachuH2 = screen.getByRole('heading',
      {
        name: 'Game Locations of Pikachu',
        level: 2,
      });
    expect(textGameLocationsPikachuH2).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(paginaDetalhePokemonURL);
    const textoSummaryH2 = screen.getByRole('heading',
      {
        name: 'Summary',
        level: 2,
      });
    expect(textoSummaryH2).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon especifico'
  + 'sendo visualizado.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(paginaDetalhePokemonURL);
    const paragrafotextSummary = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(paragrafotextSummary).toBeInTheDocument();
  });

  test('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const { history } = renderWithRouter(<App />);
    history.push(paginaDetalhePokemonURL);
    const checkboxLabelPokemonFavoritado = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxLabelPokemonFavoritado).toBeInTheDocument();
  });
});
