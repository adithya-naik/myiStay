import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiCoffee, FiList, FiBriefcase, FiFilm, FiPhone } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Define menu items with icons
  const menuItems = [
    { name: "Home", link: "/", icon: <FiHome /> },
    { name: "Rooms", link: "/rooms", icon: <FiCoffee /> },
    { name: "Menu", link: "/menu", icon: <FiList /> },
    { name: "Services", link: "/services", icon: <FiBriefcase /> },
    { name: "Entertainment", link: "/entertainment", icon: <FiFilm /> },
    { name: "Contact", link: "/contact", icon: <FiPhone /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 shadow-md">
  <div className="container mx-auto flex justify-between items-center py-4 px-6">
    {/* Logo */}
    <h1 className="text-3xl font-semibold text-gray-800">
      my<span className="text-green-600">i</span>Stay
    </h1>

    {/* Desktop Menu */}
    <div className="hidden md:flex space-x-6">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.link}
          className="text-gray-700 hover:text-green-600 transition"
        >
          {item.name}
        </Link>
      ))}
    </div>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden text-2xl text-gray-800"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <FiX /> : <FiMenu />}
    </button>
  </div>

  {/* Mobile Menu Dropdown */}
  {isOpen && (
    <div className="md:hidden flex flex-col items-center bg-white border-t border-gray-200 py-4 space-y-3">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.link}
          className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-xl">{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  )}
</nav>

  );
}

export default Navbar;
