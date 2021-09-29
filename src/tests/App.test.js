import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('2º Verifica se o topo do app contem um conjunto de links de navegação', () => {
  it('verifica se os links estão com seus respesctivos textos, e ordens.', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent(/^home$/i);
    expect(links[1]).toHaveTextContent(/^about$/i);
    expect(links[2]).toHaveTextContent(/^favorite Pokémons$/i);
  });
});

describe('verifica se os links, e rotas estão funcionando corretamento', () => {
  it('testa se ao clicar no link home redireciona para pagina inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const pathLocation = history.location.pathname;
    expect(pathLocation).toBe('/');
  });

  it('testa se ao clicar no link about redireciona para pagina about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const pathLocation = history.location.pathname;
    expect(pathLocation).toBe('/about');
  });

  it('testa se ao clicar no link about redireciona para pagina favritos', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritos = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavoritos).toBeInTheDocument();
    userEvent.click(linkFavoritos);

    const pathLocation = history.location.pathname;
    expect(pathLocation).toBe('/favorites');
  });

  it('testa se ao digitar uma pagina que nao existe renderiza pagina not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/non-ecziste');
    const titleNotFoud = screen.getByRole('heading', { level: 2 });
    expect(titleNotFoud).toBeInTheDocument();
    expect(titleNotFoud).toHaveTextContent(/^Page requested not found 😭$/i);
  });
});
