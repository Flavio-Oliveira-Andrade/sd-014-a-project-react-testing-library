import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// referencia: https://testing-library.com/docs/example-react-router/#reducing-boilerplate
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('Testa o App', () => {
  it('Testa existencia dos 3 links fixos no header', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favorites = screen.getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  it('Redireciona para a página inicial ao clicar em Home.', () => {
    renderWithRouter(<App />);
    const homeBtn = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeBtn);
    const h2 = screen.getByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
  });

  it(
    'Redireciona para a página about ao clicar em About.', () => {
      renderWithRouter(<App />);
      const aboutBtn = screen.getByRole('link', { name: /about/i });
      userEvent.click(aboutBtn);
      const h2 = screen.getByText(/About Pokédex/i);
      expect(h2).toBeInTheDocument();
    },
  );
  it(
    'Redireciona para a página de favoritos ao clicar em Favorite Pokémons.', () => {
      renderWithRouter(<App />);
      const favBtn = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(favBtn);
      const h2 = screen.getByRole('heading', { name: /Favorite pokémons/i, level: 2 });
      expect(h2).toBeInTheDocument();
    },
  );
  it('Redireciona para NotFound quando a URL é inexistente', () => {
    renderWithRouter(<App />, { route: '/url-inexistente' });
    const h2 = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });
});
