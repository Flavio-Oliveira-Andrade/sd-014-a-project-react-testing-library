import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Testa o App.js', () => {
  const pikachuPage = '/pokemons/25';
  test('Testa se a aplicação contém um conjunto fixo de links de navegação', () => {
    window.history.pushState({}, 'Pikachu Page', pikachuPage);
    render(<App />, { wrapper: BrowserRouter });

    const title = screen.getByRole('heading', { name: /pikachu details/i });
    const h2 = screen.getByRole('heading', { name: /summary/i });
    const description = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tende/i,
    );

    expect(window.location.pathname).toStrictEqual(pikachuPage);
    expect(title).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /more details/i })).not.toBeInTheDocument();
  });
  test('Testa se a aplicação é redirecionada para o inicio ao clicar em home', () => {
    window.history.pushState({}, 'Pikachu Page', pikachuPage);
    render(<App />, { wrapper: BrowserRouter });

    const h2Map = screen.getByRole('heading', { name: /game locations of pikachu/i });
    const imgMap = screen.getAllByRole('img', { name: /pikachu location/i });
    const url1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(h2Map).toBeInTheDocument();
    expect(imgMap).toHaveLength(2);
    expect(imgMap[0]).toHaveAttribute('src', url1);
    expect(imgMap[1]).toHaveAttribute('src', url2);
  });

  test('Testa se a aplicação é redirecionada para o sobre ao clicar em about', () => {
    render(<App />, { wrapper: BrowserRouter });

    const favoriteCheck = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoriteCheck).toBeInTheDocument();

    userEvent.click(favoriteCheck);

    expect(favoriteCheck).toBeChecked();

    userEvent.click(favoriteCheck);

    expect(favoriteCheck).not.toBeChecked();
  });
});
