import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  test('renders the login page', () => {
    render(<LoginPage />);

    // Check if the login page elements are rendered
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('performs login on button click', () => {
    render(<LoginPage />);

    // Mock login API call
    const mockLogin = jest.fn();
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: 'John Doe' }),
      })
    );

    // Perform login by entering values and clicking the button
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'john' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Check if the login API call is made
    expect(window.fetch).toHaveBeenCalledWith('login.action', expect.any(Object));

    // Check if the logged-in user details are handled
    // Replace with the actual logic of handling user details
    expect(mockLogin).toHaveBeenCalledWith({ user: 'John Doe' });
  });
});
