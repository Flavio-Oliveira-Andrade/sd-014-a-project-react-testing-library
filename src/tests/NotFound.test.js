import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requirement - 4 : NotFound', () => {
  it('should have h2 tag with "Page requested not found 😭"', () => {
    render(<NotFound />);
    const h2Options = { level: 2, name: /Page requested not found/ };
    const h2Tag = screen.getByRole('heading', h2Options);
    const emote = screen.getAllByRole('img')[0];
    expect(h2Tag).toBeInTheDocument();
    expect(emote).toHaveTextContent('😭');
  });
  it('should render img tag with specific src', () => {
    render(<NotFound />);
    const imgTag = screen.getAllByRole('img');
    expect(imgTag[1]).toBeInTheDocument();
    expect(imgTag[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
