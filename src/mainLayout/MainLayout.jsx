import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../routes/PrivateRoute";
import ManageUser from "../pages/Dashboard/ManageUser/ManageUser";
import AdminRoute from "../routes/AdminRoute";
import CreatorRoute from "../routes/CreatorRoute";
import AddContest from "../pages/Dashboard/AddContest/AddContest";

const createdRouter = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/manageUser',
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path: '/dashboard/addContest',
                element: <CreatorRoute><AddContest></AddContest></CreatorRoute>
            }
        ]
    }
])

export default createdRouter;