import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from '@testing-library/react';
import AuthLayout from './auth';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe( "Layout " ,()=>
  it('Layout contain Good messages when logged in : ', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<AuthLayout />);
    });
    const checkbox = container.querySelector('input')
    const messageTrue = container.querySelector('.true');
    expect(messageTrue.textContent).toBe('logique d\'authentification');
  }),
  it('Layout contain Good messages when logged out : ', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<AuthLayout />);
    });
    const checkbox = container.querySelector('input')
    act(() => {
      checkbox.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    const messageFalse = container.querySelector('.false');
    expect(messageFalse.textContent).toBe('should have navigate');
  })
)