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

describe('4 Requisito', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not found 😭;',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/sadpikachu');

      const h2 = screen.getByRole('heading', {
        level: 2,
        name: /page requested not found/i,
      });

      expect(h2).toBeInTheDocument();
    });

  // onde aprendi a fazer com o img: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f.

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/sadpikachu');

    const img = screen.getAllByRole('img');

    expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
