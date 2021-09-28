import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
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

describe('Componente PokemonDetails', () => {
  describe('As informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      beforeEachDetails();

      it(`A página deve conter um texto <name> Details,
        onde <name> é o nome do Pokémon`,
      () => {
        const title = screen.getByText(`${mockPokemon.name} Details`);
        expect(title).toBeInTheDocument();
      });

      it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado.',
        () => {
          const linkButtons = screen.getAllByRole('link');
          linkButtons.forEach((linkButton) => {
            expect(linkButton).not.toHaveAttribute('href', '/pokemon/25');
          });
        });

      it('A seção de detalhes deve conter um heading h2 com o texto Summary.',
        () => {
          const summaryHeading = screen.getByRole('heading',
            {
              name: 'Summary',
              level: 2,
            });
          expect(summaryHeading).toBeInTheDocument();
        });

      it('A seção de detalhes deve conter um heading h3 com o texto Pokémon.',
        () => {
          const paragraphDetails = screen.getByText(/This intelligent Pokémon roasts/i);
          expect(paragraphDetails).toBeInTheDocument();
        });
    });

  describe('existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      beforeEachDetails();

      it(`Na seção de detalhes deverá existir um heading h2 com o
        texto Game Locations of <name>;onde <name> é o nome do Pokémon exibido.`,
      () => {
        const heading = screen.getByRole('heading', {
          name: `Game Locations of ${mockPokemon.name}`,
          level: 2,
        });
        expect(heading).toBeInTheDocument();
      });

      it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes',
        () => {
          mockPokemon.foundAt.forEach((found) => {
            const location = screen.getByText(found.location);
            expect(location).toBeInTheDocument();
          });
        });

      it(`Deve ser exibida uma imagem do mapa em cada localização
      A imagem da localização deve ter um atributo src com a URL da localização
      A imagem da localização deve ter um atributo alt com o texto
      <name> location, onde <name> é o nome do Pokémon`,
      () => {
        const images = screen.getAllByAltText(`${mockPokemon.name} location`);
        images.forEach((image, index) => {
          expect(image).toHaveAttribute('src', mockPokemon.foundAt[index].map);
        });
      });
    });

  describe('o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      beforeEachDetails();

      it('A página deve exibir um checkbox que permite favoritar o Pokémon',
        () => {
          const checkbox = screen.getByRole('checkbox');
          expect(checkbox).toBeInTheDocument();
        });

      it(`Cliques alternados no checkbox devem adicionar e remover
        respectivamente o Pokémon da lista de favoritos`,
      () => {
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        const starIcon = screen.getByAltText(`${mockPokemon.name} is marked as favorite`);
        expect(starIcon).toBeInTheDocument();
        fireEvent.click(checkbox);
        expect(starIcon).not.toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
      });

      it('O label do checkbox deve conter o texto "Pokémon favoritado?"',
        () => {
          const checkbox = screen.getByLabelText('Pokémon favoritado?');
          expect(checkbox).toBeInTheDocument();
        });
    });
});
