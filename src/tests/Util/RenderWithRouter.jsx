import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const customHistory = createMemoryHistory();
  return {
    ...render(<Router history={ customHistory }>{component}</Router>),
    customHistory,
  };
};

export default renderWithRouter;
