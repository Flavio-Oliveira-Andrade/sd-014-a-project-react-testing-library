import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

export default renderWithRouter;

// Fonte: https://trybecourse.slack.com/archives/C016CCMKN9E/p1602269580335400?thread_ts=1602268157.324700&cid=C016CCMKN9E
// Resposta do Alberto sobre [Bloco 15.3][RTL - React Router] - [renderWithRouter && createMemoryHistory]
