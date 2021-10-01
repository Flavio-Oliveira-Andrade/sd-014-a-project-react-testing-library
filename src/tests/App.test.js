import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa redirecionamentos dentro do componente App', () => {
  test('Vai para a página inicial ao clicar no botão Home', () => {
    const { screen, history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Vai para a página Sobre ao clicar no botão About', () => {
    const { screen, history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Vai para a página Pokémon Favoritos ao clicar no botão Favorite Pokémons', () => {
    const { screen, history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Vai para a página Not Found ao inserir uma URL desconhecida', () => {
    const { screen, history } = renderWithRouter(<App />);
    history.push('/pagina/404/');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
test('', () => {});
