import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render hello world', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('hello world');
  });
});
