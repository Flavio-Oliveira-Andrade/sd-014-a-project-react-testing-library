// feito com ajuda do Notion da BeeDev https://www.notion.so/beedeveloper/BeeDev-b3284d4907f8420eb3bd6021e7baeaf9
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('App.js - Checando existencia de links', () => {
  // reinicia a renderização do App a cada teste;
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica a existência de links em <App />', () => {
    const linkHome = screen.getByText('Home');
    const linkAbout = screen.getByText('About');
    const linkFavorite = screen.getByText('Favorite Pokémons');

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
});

describe('App.js - Verificando comportamento dos links', () => {
  // reinicia a renderização do App a cada teste e cria viriável para uso do history;
  let navHistory;
  beforeEach(() => {
    navHistory = renderWithRouter(<App />).history;
  });

  it('Verifica se "Home" está funcionando corretamente', () => {
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument(); // identifica o link na tela;

    fireEvent.click(linkHome); // gatilha o link identificado;
    const homeUrl = navHistory.location.pathname; // indentifica a rota gatilhada pelo fireEvent atráves do history;
    expect(homeUrl).toStrictEqual('/'); // identifica se a url da rota é a esperada;
  });

  it('Verifica se "About" está funcionando corretamente', () => {
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument(); // identifica o link na tela;

    fireEvent.click(linkAbout); // gatilha o link identificado;
    const aboutUrl = navHistory.location.pathname; // indentifica a rota gatilhada pelo fireEvent atráves do history;
    expect(aboutUrl).toStrictEqual('/about'); // identifica se a url da rota é a esperada;
  });

  it('Verifica se "Favorite Pokémons" está funcionando corretamente', () => {
    const linkFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFav).toBeInTheDocument(); // identifica o link na tela;

    fireEvent.click(linkFav); // gatilha o link identificado;
    const favUrl = navHistory.location.pathname; // indentifica a rota gatilhada pelo fireEvent atráves do history;
    expect(favUrl).toStrictEqual('/favorites'); // identifica se a url da rota é a esperada;
  });

  it('Verifica se entrar numa URL desconhecida redireciona para "Not Found"', () => {
    navHistory.push('/url-desconhecida'); // empurra uma rota desconhecida ao array navHistory;
    const notFound = screen.getByText('Page requested not found'); // procura o texto 'Page requested not found' na tela de uma das rotas dentro de navHistory;
    expect(notFound).toBeInTheDocument(); // indentifica se o texto 'Page requested not found' está na tela;
  });
});
