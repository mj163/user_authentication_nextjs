import { render, screen } from '@testing-library/react';
import Home from '../page';
import '@testing-library/jest-dom';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // Convert boolean attributes to strings to avoid React warnings
    const safeProps = { ...props };
    if (typeof safeProps.priority === 'boolean') {
      safeProps.priority = safeProps.priority.toString();
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...safeProps} />;
  },
}));

describe('Home Page', () => {
  it('renders the Next.js logo', () => {
    render(<Home />);
    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the "Get started" text', () => {
    render(<Home />);
    const startText = screen.getByText(/Get started by editing/i);
    expect(startText).toBeInTheDocument();
  });

  it('renders the deploy link', () => {
    render(<Home />);
    const deployLink = screen.getByRole('link', { name: /deploy now/i });
    expect(deployLink).toBeInTheDocument();
    expect(deployLink).toHaveAttribute(
      'href',
      'https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
    );
  });

  it('renders the docs link', () => {
    render(<Home />);
    const docsLink = screen.getByRole('link', { name: /read our docs/i });
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute(
      'href',
      'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
    );
  });
});
