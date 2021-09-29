import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../uteis/renderWithRouter';
import App from '../App';

describe('Teste dos links do componeten App', () => {
  it('testa o texto dos links de navegação', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0].textContent).toBe('Home');
    expect(links[1].textContent).toBe('About');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });

  it('testa as rotas do link Home', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    fireEvent.click(links[0]);
    const H2 = screen
      .getByRole('heading', { level: 2, name: /Encountered Pokémons/i });
    expect(H2).toBeDefined();
  });

  it('testa as rotas dos link About', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    fireEvent.click(links[1]);
    const H2 = screen
      .getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(H2).toBeDefined();
  });

  it('testa as rotas dos links Favorite pokémons', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    fireEvent.click(links[2]);
    const H2 = screen
      .getByRole('heading', { level: 2, name: /Favorite pokémons/i });
    expect(H2).toBeDefined();
  });

  it('Ao colocar um URl que não existe, é redirecionado a Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/outraUrl');
    const notFound = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(notFound).toBeDefined();
  });
});
