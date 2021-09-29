import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/RenderWithRouter';
import App from '../App';

describe('Testa o componente <App.js/>', () => {
  test('Testa se o topo da aplicação contém os links: Home, About e Favorite.', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeInTheDocument();
  });
  test('Testa se há redirecionamento para a página inicial  ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    const { pathname } = history.location; //  para verificar se estamos na página correta
    // interagir com elementos
    fireEvent.click(home);
    // teste
    expect(pathname).toBe('/');
  });
  test('Testa se há redirecionamento para a página About, ao clicar em About.', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    fireEvent.click(about);
    const { pathname } = history.location; //  para verificar se estamos na página correta
    // teste
    expect(pathname).toBe('/about');
  });
  test('Testa se há redirecionamento para Favoritados, ao clicar em Favorite', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favorite);
    const { pathname } = history.location; //  para verificar se estamos na página correta
    // teste
    expect(pathname).toBe('/favorites');
  });
  test('Testa se é redirecionado para Not Found ao entrar em URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/inexistente/'); //  função history.push() e passamos como argumento algum link que não existe dentro de nossa aplicação
    const not = screen.getByText(/Page requested not found/i);
    expect(not).toBeInTheDocument();
    // Depois disso, testamos se o texto que aparece no navegador, ao digitar um caminho para uma página que não existe, é encontrado. (fonte: course)
  });
});
