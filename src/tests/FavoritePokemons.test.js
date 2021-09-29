import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import App from '../App';

// https://testing-library.com/docs/example-react-router/#reducing-boilerplate
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('Testa se é exibido na tela a mensagem "No favorite pokemon found",'
    + ' se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);

    const favorito = screen.getByLabelText(/pokémon favoritado/i);
    expect(favorito).toBeInTheDocument();
    fireEvent.click(favorito);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
    fireEvent.click(favoriteLink);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
