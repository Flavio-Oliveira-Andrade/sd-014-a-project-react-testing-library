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

describe('7 Requisito', () => {
  test('Se as infos detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const detailsLink = screen.getByRole('link', {
      name: /details/i,
    });

    userEvent.click(detailsLink);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });

    expect(h2).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas'
  + 'contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const detailsLink = screen.getByRole('link', {
      name: /details/i,
    });

    userEvent.click(detailsLink);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /game locations/i,
    });

    expect(h2).toBeInTheDocument();
  });
});
