/* eslint-disable react/prop-types */
import logo from "../../assets/logo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../utils/Firebase-config.js";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { useState } from "react";

const NavBar = ({ isScrolled }) => {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const navigate = useNavigate();

  const [showInput, setShowInput] = useState(false);

  onAuthStateChanged(firebaseAuth, (currentuser) => {
    if (!currentuser) navigate("/login");
  });

  return (
    <nav className={`${isScrolled ? "scrolled" : ""} flex `}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-center">
          <img
            src={logo}
            className="w-[6rem] h-[6rem] object-contain"
            alt="Logo"
          />
        </div>
        <ul className="flex gap-8">
          {links.map(({ name, link }) => {
            return (
              <li className="text-white" key={name}>
                <Link to={link}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-4 items-center">
      <div className="flex items-center gap-x-2">
  <button onClick={() => setShowInput(!showInput)}>
    <FaSearch className="text-white" />
  </button>
  {showInput && (
    <input
      type="text"
      placeholder="Search"
      className="border rounded-md px-2 py-1 outline-none transition ease-in-out duration-300"
    />
  )}
</div>

        <button onClick={() => signOut(firebaseAuth)}>
          <FaPowerOff className="text-[#e50914]" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
