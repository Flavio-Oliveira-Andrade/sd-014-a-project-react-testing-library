import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

test('A página contém um heading h2 com o texto Page requested not found', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  customHistory.push('/rota-inexistente');

  const notFoundText = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });

  expect(notFoundText).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  customHistory.push('/rota-inexistente');

  const notFoundText = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(notFoundText).toBeInTheDocument();

  const imageElement = screen.getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(imageElement).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
