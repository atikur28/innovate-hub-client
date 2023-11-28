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
import ManageContest from "../pages/Dashboard/ManageContest/ManageContest";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import AllContest from "../pages/AllContest/AllContest";
import ContestDetails from "../pages/AllContest/ContestDetails/ContestDetails";
import CreatedContest from "../pages/Dashboard/CreatedContest/CreatedContest";
import UpdateContest from "../pages/Dashboard/UpdateContest/UpdateContest";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Payment from "../pages/Payment/Payment";
import ContestSubmitted from "../pages/Dashboard/ContestSubmitted/ContestSubmitted";
import RegisteredContest from "../pages/Dashboard/RegisteredContest/RegisteredContest";

const createdRouter = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('http://localhost:5000/contests')
            },
            {
                path: '/allContest',
                element: <AllContest></AllContest>
            },
            {
                path: '/contestDetails/:id',
                element: <PrivateRoute><ContestDetails></ContestDetails></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/contests/${params.id}`)
            },
            {
                path: '/payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/contests/${params.id}`)
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
                path: '/dashboard/manageContest',
                element: <AdminRoute><ManageContest></ManageContest></AdminRoute>
            },
            {
                path: '/dashboard/addContest',
                element: <CreatorRoute><AddContest></AddContest></CreatorRoute>
            },
            {
                path: '/dashboard/createdContest',
                element: <CreatorRoute><CreatedContest></CreatedContest></CreatorRoute>
            },
            {
                path: '/dashboard/contestSubmitted',
                element: <CreatorRoute><ContestSubmitted></ContestSubmitted></CreatorRoute>
            },
            {
                path: '/dashboard/registeredContest',
                element: <RegisteredContest></RegisteredContest>
            },
            {
                path: '/dashboard/myProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path:'/dashboard/updateContest/:id',
                element: <CreatorRoute><UpdateContest></UpdateContest></CreatorRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/contests/${params.id}`)
            }
        ]
    }
])

export default createdRouter;