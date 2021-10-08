// test('', () => {});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from '../App';

// https://testing-library.com/docs/example-react-router/
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém'
  + 'um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByText(/home/i);
    const about = screen.getByText(/about/i);
    const favorites = screen.getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial', () => {
    renderWithRouter(<App />);

    const home = screen.getByText(/home/i);
    fireEvent.click(home);

    const title = screen.getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de About', () => {
    renderWithRouter(<App />);

    const about = screen.getByText(/about/i);
    fireEvent.click(about);

    const title = screen.getByText(/About Pokédex/i);
    expect(title).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para'
  + 'a página de Pokémons Favoritados', () => {
    renderWithRouter(<App />);

    const favorites = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);

    const title = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a'
  + 'página Not Found ao entrar em uma URL desconhecida.', () => {
    // https://testing-library.com/docs/example-react-router/
    const history = createMemoryHistory();
    history.push('/some/bad/route');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
