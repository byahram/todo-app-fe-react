function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white rounded-t-2xl border-b-2 border-black">
      {/* Hamburger Menu */}
      <div className="hamburger flex items-center">
        <button className="flex flex-col justify-center space-y-1">
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-800">Todo List</h1>

      {/* Profile Picture */}
      <div className="profile">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-black"
        />
      </div>
    </header>
  );
}

export default Header;
