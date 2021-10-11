import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa se é renderizado um card com as informações de determinado pokémon',
  () => {
    test('O nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

      const pokemonName = screen.getByTestId('pokemon-name');

      expect(pokemonName).toHaveTextContent('Pikachu');
    });

    test('O tipo correto do pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);

      const pokemonType = screen.getByTestId('pokemon-type');

      expect(pokemonType).toHaveTextContent('Electric');
    });

    test('O peso médio do pokémon deve ser exibido com um texto no formato '
    + '"Average weight: <value> <measurementUnit>"; onde "<value>" e '
    + '"<measurementUnit>" são, respectivamente, o peso médio do pokémon e sua unidade '
    + 'de medida', () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

      const pokemonMeasurements = screen.getByTestId('pokemon-weight');

      expect(pokemonMeasurements).toHaveTextContent('Average weight: 6.0 kg');
    });

    test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo "src" com a '
    + 'URL da imagem e um atributo "alt" com o texto "<name> sprite", onde "<name" é o '
    + 'nome do pokémon', () => {
      renderWithRouter(<App />);

      // src: https://medium.com/@drake_beth/how-to-test-images-in-react-a70053b1634a
      const pokemonAlt = screen.getByAltText('Pikachu sprite');
      expect(pokemonAlt).toBeInTheDocument();
      expect(pokemonAlt).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });
  });

describe('Testa o componente <Pokemon />', () => {
  test('O card do Pokémon indicado na Pokédex contém um link de navegação para exibir '
  + 'detalhes deste Pokémon. O link deve possuir a URL "/pokemons/<id>", onde "<id>" é '
  + 'o id do Pokémon exibido', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText('More details');

    expect(detailsLink.href).toContain('pokemons/25');
  });
});

describe('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
  test('O ícone deve ser uma imagem com o atributo "src" contendo o caminho '
  + '"/star-icon.svg"', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');

    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
