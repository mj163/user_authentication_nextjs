import React from 'react';
import RootLayout from '../layout';
import '@testing-library/jest-dom';

// Mock the next/font/google imports
jest.mock('next/font/google', () => ({
  Geist: jest.fn().mockReturnValue({
    variable: 'mocked-font-variable',
  }),
  Geist_Mono: jest.fn().mockReturnValue({
    variable: 'mocked-font-mono-variable',
  }),
}));

// Mock the metadata since we're not testing it
jest.mock('next/types', () => ({
  ...jest.requireActual('next/types'),
  Metadata: {},
}));

describe('RootLayout', () => {
  it('should be defined', () => {
    // Most basic test - just make sure the component exists
    expect(RootLayout).toBeDefined();
  });
  
  it('should have html and body elements', () => {
    // Test the structure by examining the implementation directly
    const layout = RootLayout({ children: <div>Test</div> });
    
    // Verify the layout structure without rendering
    expect(layout.type).toBe('html');
    expect(layout.props.lang).toBe('en');
    expect(layout.props.children.type).toBe('body');
  });
});
