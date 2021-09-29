import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}

describe('Teste se o topo da aplicaçãocontémumconjunto fixo de links denavegação', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);

    expect(home).toBeInTheDocument();

    fireEvent.click(getByText(/Projetos/i));

    const project = getByText(/Projeto 1/i);
    expect(project).toBeInTheDocument();
  });
});
