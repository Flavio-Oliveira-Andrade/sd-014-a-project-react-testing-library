// feito com ajuda do Notion da BeeDev https://www.notion.so/beedeveloper/BeeDev-b3284d4907f8420eb3bd6021e7baeaf9;
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';
import App from '../App';

describe('Pokemon.js - Verificação dos cards', () => {
  it('Verifica as informações do card', () => {
    renderWithRouter(<App />);

    const img = screen.getByRole('img'); // Constante igual a uma imagem na tela;

    // Feito com o Pikachu por já estar na tela. Se tem para um, tem para todos;
    expect(screen.getByText('Pikachu')).toBeInTheDocument(); // Espera a presença do nome do pokémon na tela;
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric'); // A <div> com o data-testid igual a 'pokemon-type' deve ter o tipo esperado. Pokemon.js;
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument(); // Espera as seguintes informações na tela;
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'); // Espera que a imagem seja do pokémon desejado;
    expect(img.alt).toBe('Pikachu sprite'); // Verifica se o alt da imagem é '{ nome do pokémon } sprite';
  });

  it('Verifica se o card possui link para os detalhes do pokémon em questão'
  + 'e se clicando nele o usuário é redirecionado', () => {
    const { id } = pokemons[0]; // Pega o primeiro id contido no array pokemons, importado de data.js. Neste caso é 25, o de Pikachu;
    const { history } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    ); // Pega o history zerado do componente Pokemon quando ele não está favoritado para o primeiro pokemon do array;
    const detailLink = screen.getByRole('link', { name: /more details/i }); // Pega o link com o texto de 'More details';

    fireEvent.click(detailLink);
    const { pathname } = history.location; // Constante que pega o caminho da history;
    expect(pathname).toBe(`/pokemons/${id}`); // Espera que o caminho levado seja o do link;
  });

  it('Verifica se aparece o icone de estrela no Pokémon favoritado', () => {
    renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemons[0] } />,
    ); // Renderiza o componente com o primeiro pokémon favoritado;

    const favStar = screen.getByRole('img', { name: /marked as favorite/i }); // Pega imagem da estrela dos favoritos;

    expect(favStar).toBeInTheDocument(); // Vê se ela está no documento;
    expect(favStar.src).toMatch(/star-icon.svg/i); // Vê se é a imagem certa;
    expect(favStar.alt).toBe(`${pokemons[0].name} is marked as favorite`); // Vê se o alt da imagem é '{ nome do pokémon } is marked as favorite';
  });
});
