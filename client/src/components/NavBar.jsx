const NavBar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-xl font-semibold text-gray-900">
          Prompt2CLI
        </a>

        <div className="flex items-center gap-6">
          <a className="text-sm text-gray-600 transition hover:text-violet-700" href="#home">
            Home
          </a>
          <a className="text-sm text-gray-600 transition hover:text-violet-700" href="#about">
            About
          </a>
          <a className="text-sm text-gray-600 hover:text-gray-900" href="#contact">
            Contact
          </a>
          <a className="text-sm text-gray-600 hover:text-gray-900" href="#contact">
            Login/Signup
          </a>
        </div>
      </div>
    </nav>
  )
}

export default NavBar