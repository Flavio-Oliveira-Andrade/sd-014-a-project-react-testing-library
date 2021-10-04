// feito com ajuda do Notion da BeeDev https://www.notion.so/beedeveloper/BeeDev-b3284d4907f8420eb3bd6021e7baeaf9;
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('PokemonDetails.js - Virificando funcionalidade', () => {
  // reinicia a renderização do App a cada teste;
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se as informações detalhadas do Pokémon estão na tela', () => {
    const detailLink = screen.getByRole('link', { name: /more details/i }); // Pega o link com o texto de 'More details';
    fireEvent.click(detailLink); // Clica no link para os detalhes do Pokémon;

    // Feito com o Pikachu por já estar na tela. Se funciona para um, funciona para todos;
    const h2Tittle = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' }); // Pega o heading com o contéudo '{ nome do pokémon } Details';
    const h2Summary = screen.getByRole('heading', { level: 2, name: 'Summary' }); // Pega o heading com o contéudo 'Summary';
    const summary = screen.getByText(`${pokemons[0].summary}`); // Pega o contéudo do chave 'summary' do primeiro Pokémon (Pikachu) do array do data.js;
    const h2Locations = screen.getByRole('heading',
      {
        level: 2,
        name: 'Game Locations of Pikachu',
      }); // Pega o heading com o contéudo 'Game Locations of Pikachu';
    const locations = screen.getAllByAltText('Pikachu location'); // Pega todas as localizações do Pikachu;

    expect(detailLink).not.toBeInTheDocument(); // Verifica se o link de 'More details' não está mais na tela;
    expect(h2Tittle).toBeInTheDocument(); // Verifica se o heading 'Pikachu Details' está no documento;
    expect(h2Summary).toBeInTheDocument(); // Verifica se o heading 'Summary' está no documento;
    expect(summary).toBeInTheDocument(); // Verifica se o summary do Pokémon em questão está no documento;
    expect(h2Locations).toBeInTheDocument(); // Verifica se o heading 'Game Locations of Pikachu' está no documento;
    expect(locations.length).toBe(pokemons[0].foundAt.length); // Verifica se o número de localizações na tela bate com o que está no data.js;
    locations.forEach((image, index) => {
      expect(image).toHaveAttribute('src', pokemons[0].foundAt[index].map);
    }); // Verifica se o src de cada imagem corresponde aos que estão no data.js;
  });

  it('Verifica a possibilidade de favoritar o Pokémon pela página de detalhes', () => {
    const detailLink = screen.getByRole('link', { name: /more details/i }); // Pega o link com o texto de 'More details';
    fireEvent.click(detailLink); // Clica no link para os detalhes do Pokémon;

    const favoriteText = screen.getByLabelText('Pokémon favoritado?'); // Pega o texto da label do botão de favoritar;
    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }); // Pega o botão de favoritar;

    expect(favoriteText).toBeInTheDocument(); // Verifica se a label com o texto certo está no documento;
    expect(favorite).toBeInTheDocument(); // Verifica se o botão de favoritar está no documento;
    fireEvent.click(favorite); // Clica no botão de favoritar;

    const favorited = screen.getByAltText(/is marked as favorite/i); // Pega o aviso de favoritado;
    expect(favorited).toBeInTheDocument(); // Verifica se o pokémon foi favoritado;
    fireEvent.click(favorite); // Clica no botão de favoritar novamente, agora para desfavoritar;
    expect(favorited).not.toBeInTheDocument(); // Verifica se o pokémon foi desfavoritado;
  });
});
