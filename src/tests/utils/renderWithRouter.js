import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const customHistory = createMemoryHistory();
  const renderObj = render(
    <Router history={ customHistory }>
      { component }
    </Router>,
  );

  return {
    ...renderObj,
    history: customHistory,
  };
};

export default renderWithRouter;
