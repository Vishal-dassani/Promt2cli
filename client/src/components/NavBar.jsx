import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          Prompt2CLI
        </Link>

        <div className="flex items-center gap-6">
          <Link className="text-sm text-gray-600 transition hover:text-violet-700" to="/">
            Home
          </Link>
          <Link className="text-sm text-gray-600 transition hover:text-violet-700" to="/about">
            About
          </Link>
          <Link className="text-sm text-gray-600 transition hover:text-violet-700" to="/contact">
            Contact
          </Link>
          <a className="text-sm text-gray-600 hover:text-gray-900" href="#contact">
            Login/Signup
          </a>
        </div>
      </div>
    </nav>
  )
}

export default NavBar