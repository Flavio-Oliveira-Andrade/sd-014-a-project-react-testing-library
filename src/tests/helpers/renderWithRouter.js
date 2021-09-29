import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

// Recebe um componente por parâmetro e o renderiza com a rota e o histórico daquela rota. Visto com aula do dia 15.3.
const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

export default renderWithRouter;
