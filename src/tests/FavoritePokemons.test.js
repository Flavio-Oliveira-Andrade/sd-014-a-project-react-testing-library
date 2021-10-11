import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste do componente Favorite Pokémons', () => {
  it('Exibe "No favorite pokemon found", se a pessoa não tiver favoritos.', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    fireEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Cards de favoritos são exibidos na página', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    fireEvent.click(screen.getByRole('link', { name: /more details/i }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));

    expect(screen.getByRole('link', { name: /more details/i })).toBeInTheDocument();
  });
});
