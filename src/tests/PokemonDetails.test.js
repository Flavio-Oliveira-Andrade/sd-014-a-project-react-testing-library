import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  test('A página deve conter um texto <name> Details, '
  + 'onde <name> é o nome do Pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const pokemonDetailsText = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(pokemonDetailsText).toBeInTheDocument();
  });

  test('Não deve existir o link de navegação '
  + 'para os detalhes do Pokémon selecionado', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).not.toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetailsLink);

    const summaryText = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryText).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um parágrafo com '
  + 'o resumo do Pokémon específico sendo visualizado', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetailsLink);

    const pokemonInfoText = screen.getByText('This intelligent Pokémon roasts hard '
    + 'berries with electricity to make them tender enough to eat.');
    expect(pokemonInfoText).toBeInTheDocument();
  });
});

describe('Existe na página uma seção com os mapas '
+ 'contendo as localizações do pokémon', () => {
  test('Na seção de detalhes deverá existir um heading h2 com '
  + 'o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const pokemonDetailsText = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(pokemonDetailsText).toBeInTheDocument();
  });

  test('Todas as localizações do Pokémon devem '
  + 'ser mostradas na seção de detalhes', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetailsLink);

    const pokemonLocation = screen.getAllByRole('img', {
      name: 'Pikachu location',
    });
    expect(pokemonLocation).toHaveLength(2);
  });

  test('Devem ser exibidos, o nome da localização '
  + 'e uma imagem do mapa em cada localização', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetailsLink);

    const pokemonLocation = screen.getAllByRole('img', {
      name: 'Pikachu location',
    });
    expect(pokemonLocation).toHaveLength(2);
    expect(pokemonLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const locationNameOne = screen.getByText('Kanto Viridian Forest');
    const locationNameTwo = screen.getByText('Kanto Power Plant');
    expect(locationNameOne).toBeInTheDocument();
    expect(locationNameTwo).toBeInTheDocument();
  });
});

describe('Teste se o usuário pode favoritar um pokémon '
+ 'através da página de detalhes', () => {
  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetailsLink);

    const favoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(favoritePokemon).toBeInTheDocument();
  });

  test('Cliques alternados no checkbox devem adicionar e remover '
  + 'respectivamente o Pokémon da lista de favoritos', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetailsLink);

    const favoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);

    const imageIcon = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(imageIcon).toBeInTheDocument();

    userEvent.click(favoritePokemon);
    expect(imageIcon).not.toBeInTheDocument();
  });
});
