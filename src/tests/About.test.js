import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import App from '../App';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  return {
    ...render(
      <Router history={ customHistory }>
        {component}
      </Router>,
    ),
    history: customHistory,
  };
}

describe('2 Requisito', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');

    const h1 = screen.getByRole('heading', {
      level: 1,
      name: /pokédex/i,
    });

    expect(h1).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });

    expect(h2).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');

    const p1 = screen.getByText(/digital encyclopedia/i);
    const p2 = screen.getByText(/filter Pokémons by type/i);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  // onde aprendi a fazer com o img: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f.

  test('Teste se a página contém uma imagem de uma Pokédex:', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
