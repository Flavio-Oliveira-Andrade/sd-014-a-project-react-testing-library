import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import historyFunction from '../utils/historyFunction';
import App from '../App';

describe('Teste o topo da aplicação'
+ 'contém um conjunto fixo de links de navegação', () => {
  test('teste links no topo da pagina', () => {
    historyFunction(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  test('teste /home', () => {
    const { history } = historyFunction(<App />);
    history.push('/');

    const home = screen.getByRole('link', { name: 'Home' });
    const homeText = screen.getByRole('heading', { level: 2 });

    userEvent.click(home);

    expect(homeText).toBeInTheDocument();
  });

  test('test /about', () => {
    const { history } = historyFunction(<App />);
    history.push('/about');

    const about = screen.getByRole('link', { name: 'About' });
    const aboutText = screen.getByRole('heading', { level: 2 });
    userEvent.click(about);
    expect(aboutText).toBeInTheDocument();
  });

  test('test /favorites', () => {
    const { history } = historyFunction(<App />);
    history.push('/favorites');

    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    const favoritesText = screen.getByRole('heading', { level: 2 });
    userEvent.click(favorites);

    expect(favoritesText).toBeInTheDocument();
  });

  test('test /NotFound', () => {
    const { history } = historyFunction(<App />);
    history.push('/asd');

    const notFond = screen.getByText('Page requested not found');
    expect(notFond).toBeInTheDocument();
  });
});
