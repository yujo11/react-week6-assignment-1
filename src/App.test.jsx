import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  beforeEach(() => {
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) =>
      selector({
        regions: [{ id: 1, name: '서울' }],
        categories: [{ id: 1, name: '한식' }],
        restaurants: [{ id: 1, name: '마법사주방' }],
      })
    );
  });

  function renderApp({ path }) {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );
  }
  context('with path /', () => {
    it('renders the Home page', () => {
      const { container } = renderApp({ path: '/' });
      expect(container).toHaveTextContent('Welcome Home!');
    });
  });

  context('with path /about', () => {
    it('renders the about page', () => {
      const { container } = renderApp({ path: '/about' });
      expect(container).toHaveTextContent('소개');
    });
  });

  context('with path /restaurants', () => {
    it('renders the resataurants page', () => {
      const { container } = renderApp({ path: '/restaurants' });
      expect(container).toHaveTextContent('서울');
      expect(container).toHaveTextContent('한식');
      expect(container).toHaveTextContent('마법사주방');
    });
  });

  context('with invalid path', () => {
    it('renders the not found page', () => {
      const { container } = renderApp({ path: '/없는경로' });
      expect(container).toHaveTextContent('404');
    });
  });
});
