import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useCreator from "../../hooks/useCreator";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isCreator] = useCreator();
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 min-h-screen bg-blue-100 pt-10 px-5">
        <h3 className="text-2xl font-bold mb-10">InnovateHub</h3>
        <ul className="font-bold space-y-2 border-b-2 border-black pb-5">
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to="/dashboard/manageUser"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-blue-700 underline"
                      : ""
                  }
                >
                  Manage User
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageContest"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-blue-700 underline"
                      : ""
                  }
                >
                  Manage Contest
                </NavLink>
              </li>
            </>
          )}
          {isCreator && (
            <>
              <li>
                <NavLink
                  to="/dashboard/addContest"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-blue-700 underline"
                      : ""
                  }
                >
                  Add Contest
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/createdContest"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-blue-700 underline"
                      : ""
                  }
                >
                  My Created Contest
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/contestSubmitted"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-blue-700 underline"
                      : ""
                  }
                >
                  Contest Submitted
                </NavLink>
              </li>
            </>
          )}
          {!isAdmin && !isCreator && (
            <>
              <li>
                <NavLink
                  to="/dashboard/registeredContest"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-blue-700 underline"
                      : ""
                  }
                >
                  Registered Contest
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/winningContest"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-blue-700 underline"
                      : ""
                  }
                >
                  Winning Contest
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myProfile"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-blue-700 underline"
                      : ""
                  }
                >
                  My Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <ul className="font-bold space-y-2 pt-5">
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-blue-700 underline"
                  : ""
              }
            >
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
