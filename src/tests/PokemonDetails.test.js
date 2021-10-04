import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando PokemonDetails', () => {
  const pikachu = pokemons[0];
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pikachu.id}`);
  });
  it('Teste se as informações detalhadas do'
  + ' Pokémon selecionado são mostradas na tela. ', () => {
    // A página deve conter um texto "<name> Details", onde <name> é o nome do Pokémon;
    const textNameDetails = screen.getByText(`${pikachu.name} Details`);
    expect(textNameDetails).toBeInTheDocument();
    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    const MoreDetailsLink = screen.queryByText(/More details/i);
    expect(MoreDetailsLink).toBeNull();
    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const headingSummary = screen.getByRole('heading', { name: /Summary/i });
    expect(headingSummary).toBeInTheDocument();
    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const summaryText = screen.getByText(pikachu.summary);
    expect(summaryText).toBeInTheDocument();
  });
  it('Teste se existe na página uma seção'
  + ' com os mapas contendo as localizações do pokémon ', () => {
    // Na seção de detalhes deverá existir um heading h2 com o texto "Game Locations of <name>", onde <name> é o nome do Pokémon exibido.
    const headingSectionMaps = screen.getByRole('heading', {
      name: `Game Locations of ${pikachu.name}` });

    expect(headingSectionMaps).toBeInTheDocument();
    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    // A imagem da localização deve ter um atributo src com a URL da localização;
    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
    const pikachuLocations = pikachu.foundAt;
    const pikachuLocationsElements = screen.getAllByAltText(
      `${pikachu.name} location`,
    );
    expect(pikachuLocationsElements.length).toBe(pikachuLocations.length);
    pikachuLocations.forEach((location, index) => {
      expect(pikachuLocationsElements[index].src).toBe(location.map);
      expect(pikachuLocationsElements[index].alt).toBe(`${pikachu.name} location`);
    });
  });
  it('Teste se o usuário pode favoritar um'
  + ' pokémon através da página de detalhes. ', () => {
    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    const textAltOfFavoriteCheck = 'Pikachu is marked as favorite';
    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    const favoriteCheck = screen.queryByAltText(textAltOfFavoriteCheck);
    expect(favoriteCheck).toBeNull();
    userEvent.click(favoriteCheckbox);
    const favoriteCheck2 = screen.queryByAltText(textAltOfFavoriteCheck);
    expect(favoriteCheck2.alt).toBe(textAltOfFavoriteCheck);
    // O label do checkbox deve conter o texto Pokémon favoritado?;
    const labelOfCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(labelOfCheckbox).toBeInTheDocument();
  });
});
