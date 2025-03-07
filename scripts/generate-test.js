#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Templates for different component types
const templates = {
  page: (componentName) => `import { render, screen } from '@testing-library/react';
import ${componentName} from '../${componentName.toLowerCase()}';
import '@testing-library/jest-dom';

// Mock the next/image component if needed
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) => {
    // Convert boolean attributes to strings to avoid React warnings
    const safeProps = { ...props };
    if (typeof safeProps.priority === 'boolean') {
      safeProps.priority = safeProps.priority.toString();
    }
    return <img src={src} alt={alt} {...safeProps} />;
  },
}));

describe('${componentName} Component', () => {
  it('renders correctly', () => {
    render(<${componentName} />);
    // Add your assertions here
    // Example: expect(screen.getByText(/some text/i)).toBeInTheDocument();
  });
  
  // Add more test cases as needed
});
`,

  layout: (componentName) => `import React from 'react';
import ${componentName} from '../${componentName.toLowerCase()}';
import '@testing-library/jest-dom';

// Mock any necessary dependencies
${componentName.includes('Layout') ? `
// Mock the next/font/google imports if needed
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
}));` : ''}

describe('${componentName} Component', () => {
  it('should be defined', () => {
    expect(${componentName}).toBeDefined();
  });
  
  ${componentName.includes('Layout') ? `
  it('should have the correct structure', () => {
    // Test the structure by examining the implementation directly
    const component = ${componentName}({ children: <div>Test</div> });
    
    // Add appropriate assertions based on your component structure
    expect(component.type).toBe('div'); // Adjust this based on your actual component
  });` : `
  it('renders correctly', () => {
    // Add your test implementation here
  });`}
});
`,

  component: (componentName) => `import { render, screen } from '@testing-library/react';
import ${componentName} from '../${componentName}';
import '@testing-library/jest-dom';

describe('${componentName} Component', () => {
  it('renders correctly', () => {
    render(<${componentName} />);
    // Add your assertions here
  });
  
  // Add more test cases for different props, states, or interactions
  // Example:
  // it('handles click events', () => {
  //   const mockFn = jest.fn();
  //   render(<${componentName} onClick={mockFn} />);
  //   const element = screen.getByRole('button');
  //   element.click();
  //   expect(mockFn).toHaveBeenCalled();
  // });
});
`
};

function createTestFile(componentPath, componentType) {
  // Extract component name and directory
  const componentName = path.basename(componentPath, path.extname(componentPath));
  const componentDir = path.dirname(componentPath);
  
  // Create test directory if it doesn't exist
  const testDir = path.join(componentDir, '__tests__');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  // Create test file
  const testFilePath = path.join(testDir, `${componentName}.test.tsx`);
  
  // Check if file already exists
  if (fs.existsSync(testFilePath)) {
    console.log(`Test file already exists: ${testFilePath}`);
    rl.close();
    return;
  }
  
  // Use the appropriate template based on component type
  const template = templates[componentType] || templates.component;
  const testFileContent = template(componentName);
  
  // Write the test file
  fs.writeFileSync(testFilePath, testFileContent);
  console.log(`Test file created successfully: ${testFilePath}`);
  rl.close();
}

// If this script is executed directly
if (require.main === module) {
  console.log('Test File Generator');
  console.log('------------------');
  
  rl.question('Enter the path to the component file (relative to project root): ', (componentPath) => {
    // Normalize path (handle both absolute and relative paths)
    const normalizedPath = path.isAbsolute(componentPath) 
      ? componentPath 
      : path.join(process.cwd(), componentPath);
    
    rl.question('What type of component is this? (page, layout, component): ', (componentType) => {
      if (!['page', 'layout', 'component'].includes(componentType)) {
        console.log('Invalid component type. Using "component" as default.');
        componentType = 'component';
      }
      
      createTestFile(normalizedPath, componentType);
    });
  });
}

module.exports = { createTestFile };
