import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  const history = createMemoryHistory();
  const rotaAleatória = '/rotaAleatória';
  history.push(rotaAleatória);
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const heading = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  const imagem = screen.getAllByRole('img')[1];
  const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(heading).toBeInTheDocument();
  expect(imagem).toHaveAttribute('src', URL);
});
