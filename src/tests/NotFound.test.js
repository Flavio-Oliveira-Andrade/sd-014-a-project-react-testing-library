import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('4. Teste o componente <NotFound.js />', () => {
  it('Teste a presença de alguns contéudos',
    () => {
      render(
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>,
      );
      const header = screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      });
      const image = screen.getAllByRole('img')[1];
      expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
      expect(header).toBeInTheDocument();
    });
});
