import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X, LogOut } from "lucide-react"; 
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  return (
    <nav className="w-full h-20 border-b border-gray-800 px-5 flex items-center justify-between sticky top-0 left-0 z-50 bg-[var(--color-neutral)]">
      <div className="flex items-center gap-6">
        <Link to="/">
          <img src={logo} alt="LOGO" className="w-28" />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/portfolio" className="hover:text-primary">
              Portfolio
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{user?.name}</span>
                {user?.image ? (
                  <img
                    src={user.image}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                    alt={user.name}
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-600">
                    <span className="text-xs">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-red-500 hover:text-red-400 text-sm font-medium"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/register" className="hover:text-primary">
                Register
              </Link>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-black border-b border-gray-800 flex flex-col p-5 gap-4 md:hidden z-50">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/portfolio" onClick={() => setIsOpen(false)}>
              Portfolio
            </Link>
          )}
          <hr className="border-gray-700" />
          {isLoggedIn ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                {user?.image ? (
                  <img
                    src={user.image}
                    className="w-8 h-8 rounded-full"
                    alt="User"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{user?.name}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-red-500 flex items-center gap-2"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link to="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
              <Link
                to="/login"
                className="btn-primary w-fit"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
