import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useCreator from "../../../hooks/useCreator";
import logo from "../../../assets/images/logo.jpg";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isCreator] = useCreator();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-red-700 underline" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allContest"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-red-700 underline" : ""
          }
        >
          All Contest
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-red-700 underline" : ""
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/roles-responsibility"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-red-700 underline" : ""
          }
        >
          Roles
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 font-bold shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <img className="w-[40px] h-[40px] rounded-full" src={logo} alt="" />
          <Link to="/" className="md:text-2xl font-semibold md:font-bold">
            InnovateHub
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="text-lg font-semibold flex gap-5">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center md:gap-3">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 md:w-10 rounded-full mx-auto">
                {user ? (
                  <img src={user.photoURL} />
                ) : (
                  <img src="https://i.ibb.co/whSBfc4/user.png" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow font-bold bg-base-100 rounded-box w-52"
            >
              {user ? (
                <li>
                  <p>{user.displayName}</p>
                </li>
              ) : (
                <li></li>
              )}
              <li>
                {user && isAdmin && (
                  <>
                    <NavLink
                      to="/dashboard/manageUser"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-red-700 underline"
                          : ""
                      }
                    >
                      Dashboard
                    </NavLink>
                  </>
                )}
                {user && isCreator && (
                  <>
                    <NavLink
                      to="/dashboard/addContest"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-red-700 underline"
                          : ""
                      }
                    >
                      Dashboard
                    </NavLink>
                  </>
                )}
                {user && !isAdmin && !isCreator && (
                  <>
                    <NavLink
                      to="/dashboard/myProfile"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-red-700 underline"
                          : ""
                      }
                    >
                      Dashboard
                    </NavLink>
                  </>
                )}
                {!user && (
                  <>
                    <NavLink
                      to="/login"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? ""
                          : ""
                      }
                    >
                      Dashboard
                    </NavLink>
                  </>
                )}
              </li>
              <li>
                {user ? (
                  <p onClick={handleLogOut}>Logout</p>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-red-700 underline"
                        : ""
                    }
                  >
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
