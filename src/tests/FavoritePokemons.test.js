import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('3 Requisito', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');

    const p1 = screen.getByText(/No favorite pokemon/i);

    expect(p1).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const pokemonBtn = screen.getByRole('button', {
      name: /electric/i,
    });

    userEvent.click(pokemonBtn);

    const detailsLink = screen.getByRole('link', {
      name: /details/i,
    });

    const favLink = screen.getByRole('link', {
      name: /favorite/i,
    });

    userEvent.click(detailsLink);

    const favCheck = screen.getByRole('checkbox', { checked: false });

    userEvent.click(favCheck);
    userEvent.click(favLink);

    // const p1 = screen.getByText(/more details/i);

    // expect(p1).toBeInTheDocument();

    const img = screen.getAllByRole('img');

    expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
  });
});
