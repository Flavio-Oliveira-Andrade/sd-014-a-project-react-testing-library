import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export default function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history
   || createMemoryHistory({ initialEntrises: [route] });

  return {
    ...render(<Router history={ history }>{ui}</Router>), history, screen,
  };
}
