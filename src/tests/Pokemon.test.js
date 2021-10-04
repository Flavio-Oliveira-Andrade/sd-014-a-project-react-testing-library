import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa o componente "Pokemon"', () => {
  test('renderiza um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
  });

  test('link possui URL: /pokemons/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
  });

  test('redireciona a aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
  });

  test('URL exibida no navegador muda para /pokemon/<id>, <id> é o id do Pokémon', () => {
    renderWithRouter(<App />);
  });

  test('existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
  });
});
