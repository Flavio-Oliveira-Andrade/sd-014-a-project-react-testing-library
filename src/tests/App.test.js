import { screen, userEvent } from '@testing-library/react';

import renderPath from './utilities/renderPath';

describe('Testa se todos o links tem os nomes corretos', () => {
  test('Testa se o Link para Home tem o nome "Home"', () => {
    renderPath('/');

    const linkHome = screen.getByRole('link', {
      name: 'Home',
    });
    expect(linkHome).toBeInTheDocument();
  });

  test('Testa se o Link para About tem o nome "About"', () => {
    renderPath('/');

    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    expect(linkAbout).toBeInTheDocument();
  });

  test('Testa se o Link para Favorite Pokémons tem o nome "Favorite Pokémons"', () => {
    renderPath('/');

    const linkFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(linkFavorite).toBeInTheDocument();
  });
});

describe('Testa se os links renderizam os componentes corretos', () => {

  test('Testa se ao clicar no link "Home" o componente Home é renderizado', () => {
    renderPath('/');

    const titleHome = screen.getByText('Encountered pokémons');

    expect(titleHome).toBeInTheDocument();
  });

  test('Testa se ao clicar no link "About" o componente About é renderizado', () => {
    renderPath('/about');

    const titleAbout = screen.getByText('About Pokédex');

    expect(titleAbout).toBeInTheDocument();
  });

  test('Testa se ao clicar no link "About" o componente About é renderizado', () => {
    renderPath('/favorites');

    const titleFavorites = screen.getByText('Favorite pokémons');

    expect(titleFavorites).toBeInTheDocument();
  });
});
