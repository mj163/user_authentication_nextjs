import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link className="text-2xl font-bold" href="/">
              R. Dolce Group
            </Link>
            <p className="text-gray-400">
              Providing consultation and rental platform solutions for property managers.
              Transform your rental operations with powerful tools and streamlined tenant experiences.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-gray-400 hover:text-white" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="/team">
                  Meet the Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-gray-400 hover:text-white" href="/contact">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="/terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>Copyright © {new Date().getFullYear()} R. Dolce Group</p>
        </div>
      </div>
    </footer>
  );
}
