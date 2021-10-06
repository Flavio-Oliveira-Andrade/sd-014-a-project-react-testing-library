import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

it('should redirect to initial page', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const home = screen.getByRole('link', {
    name: 'Home',
  });
  expect(home).toBeInTheDocument();
});
