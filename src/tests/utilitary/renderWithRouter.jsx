import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const renderWithRouter = (componentToRender) => {
  const createdHistory = createMemoryHistory();
  return {
    ...render(
      <Router history={ createdHistory }>
        {componentToRender}
      </Router>,
    ),
    history: createdHistory,
  };
};

export default renderWithRouter;
