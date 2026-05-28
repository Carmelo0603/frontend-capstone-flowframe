import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store";
import { logout } from "../../store/authSlice";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navLinkClass = (path: string) => `
    text-xs font-bold tracking-widest transition-colors hover:text-neutral-900 uppercase
    ${location.pathname === path ? "text-neutral-900 border-b-2 border-neutral-900 pb-1" : "text-neutral-500"}
  `;

  return (
    <nav className="w-full bg-white border-b border-neutral-200 px-8 h-16 flex items-center justify-between shrink-0 sticky top-0 z-50">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-xl font-black tracking-tighter text-neutral-900">
          FLOWFRAME
        </Link>

        <div className="hidden md:flex gap-8 items-center mt-1">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/workspace" className={navLinkClass("/workspace")}>
            Workspace
          </Link>
          <Link to="/ux-library" className={navLinkClass("/ux-library")}>
            UX Library
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {token ? (
          <>
            <Link to="/dashboard" className="text-xs font-bold text-neutral-900 hover:text-neutral-600 uppercase transition-colors">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="text-xs font-bold text-neutral-500 hover:text-red-600 uppercase transition-colors cursor-pointer">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-xs font-bold text-neutral-500 hover:text-neutral-900 uppercase transition-colors">
              Login
            </Link>
            <Link to="/register" className="bg-neutral-900 text-white px-4 py-2 text-xs font-bold uppercase hover:bg-neutral-800 transition-colors">
              Registrati
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
