import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('teste para verificar se o component App está sendo renderizado', () => {
  render(
    <Router history={ createMemoryHistory('/') }>
      <App />
    </Router>,
  );
  const titulo = screen.getByRole('heading', { level: 1, name: 'Pokédex' });
  expect(titulo).toBeInTheDocument();
});
