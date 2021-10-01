import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testa o componente "Not Found"', () => {
  test('Teste se página contém um heading'
  + 'h2 com o texto Page requested not found', () => {
    // Teste quase redundante com o do primeiro requisito.
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/bananas');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    const notFoundImage = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    expect(notFoundText).toBeInTheDocument();
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
