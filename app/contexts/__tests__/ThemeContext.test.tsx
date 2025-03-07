import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';
import '@testing-library/jest-dom';

// A test component that uses the theme context
function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-value">{theme}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

describe('ThemeContext', () => {
  it('provides default theme as light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });
  
  it('provides the initial theme if specified', () => {
    render(
      <ThemeProvider initialTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });
  
  it('toggles the theme when toggleTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Initial theme is light
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    
    // Click the toggle button
    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
    
    // Theme should now be dark
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    
    // Click again
    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
    
    // Theme should be back to light
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });
  
  it('throws an error when useTheme is used outside of ThemeProvider', () => {
    // Suppress console.error for this test to avoid noisy output
    const originalError = console.error;
    console.error = jest.fn();
    
    // Expect the render to throw an error
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');
    
    // Restore console.error
    console.error = originalError;
  });
});
