// feito com ajuda do Notion da BeeDev https://www.notion.so/beedeveloper/BeeDev-b3284d4907f8420eb3bd6021e7baeaf9;
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('FavoritePokemons.js - Verificação de funcionalidade', () => {
  renderWithRouter(<FavoritePokemons />);

  it('Verifica se mensagemm mostrada é a esperada' // linha ficou com mais de 90 caracteres;
  + 'caso não haja Pokémons Favoritados', () => {
    const noFav = screen.getByText('No favorite pokemon found'); // procura na tela o texto "No favorite pokemon found";
    expect(noFav).toBeInTheDocument(); // verifica se o texto está presente no documento;
  });

  // essa parte do requisito está mal implementada,
  // ela passa se você apenas renderizar o <FavoritePokemons /> como feito na linha 8;
  it('Verifica se os cards dos pokémons favoritados aparecem', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByText('Fire')); // clica botão com o texto "Fire";
    fireEvent.click(screen.getByText('More details')); // clica botão com o texto "More details";
    fireEvent.click(screen.getByText('Pokémon favoritado?')); // clica botão com o texto "Pokémon favoritado?";
    fireEvent.click(screen.getByText('Favorite Pokémons')); // clica botão com o texto "Favorite Pokémons";

    const favMon = screen.getByText('Charmander');
    expect(favMon).toBeInTheDocument(); // espera que o Charmander esteja na tela;
  });
});
