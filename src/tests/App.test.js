import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes do componente <App /> - Requisito 1', () => {
  test('Se renderiza link "Home"', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('Se renderiza link "About"', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('Se renderiza link "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('Se a aplicação é redirecionada para a página inicial,'
  + 'na URL "/" ao clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Home'));
    expect(history.location.pathname).toBe('/');
  });

  test('Se a aplicação é redirecionada para a página de About,'
  + 'na URL "/about" ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('About'));
    expect(history.location.pathname).toBe('/about');
  });

  test('Se a aplicação é redirecionada para a página Pokémons Favoritados,'
  + 'na URL "/favorites" ao clicar no link Favorite Pokémons da barra de'
  + ' navegação.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se a aplicação é redirecionada para a página Not Found ao entrar'
  + ' em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('nao-existe');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });

});
