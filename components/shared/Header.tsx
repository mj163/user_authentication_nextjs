'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link className="text-2xl font-bold text-gray-800" href="/">
            R. Dolce Group
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link className="text-gray-600 hover:text-gray-900" href="/">
              Home
            </Link>
            <Link className="text-gray-600 hover:text-gray-900" href="/blog">
              Blog
            </Link>
            <Link className="text-gray-600 hover:text-gray-900" href="/team">
              Meet the Team
            </Link>
            <Link 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              href="/signup"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                className="text-gray-600 hover:text-gray-900"
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900"
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900"
                href="/team"
                onClick={() => setIsMenuOpen(false)}
              >
                Meet the Team
              </Link>
              <Link
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
