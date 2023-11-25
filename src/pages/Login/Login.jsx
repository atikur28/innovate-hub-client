import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../SharedPages/Navbar/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { login, loginInWithGoogle } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoginError('');

    login(email, password)
      .then(result => {
        console.log(result.user);
        Swal.fire({
            title: "Good job!",
            text: "You have logged in successfully!",
            icon: "success"
          });
        navigate(from, {replace: true});
      })
      .catch(error => {
        setLoginError(error.message);
      })
  };

  const handleGoogleLogin = () => {
    loginInWithGoogle()
      .then((result) => {
        console.log(result.user);
        Swal.fire("Good job!", "You have successfully logged in..", "success");
        navigate(from, {replace: true});
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="md:w-3/5 md:mx-auto my-10 py-10 bg-blue-50 rounded mx-2">
        <h2 className="text-2xl font-bold text-center">
          Login to your account
        </h2>
        <form onSubmit={handleLogin} className="w-full">
          <div className="w-2/3 mx-auto mt-5">
            <h3 className="text-lg font-semibold mb-1">Your email</h3>
            <input
              className="w-full py-1.5 px-2 rounded border border-gray-300"
              placeholder="Email address"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="w-2/3 mx-auto mt-3">
            <h3 className="text-lg font-semibold mb-1">Password</h3>
            <input
              className="w-full py-1.5 px-2 rounded border border-gray-300"
              placeholder="Password"
              type="password"
              name="password"
              required
            />
          </div>
          <div className="w-2/3 mx-auto mt-7">
            <button className="bg-gray-700 text-white font-bold md:text-lg w-full rounded py-1.5">
              Login
            </button>
          </div>
        </form>
        {loginError && (
          <p className="text-red-600 font-semibold text-center">
            {loginError}
          </p>
        )}
        <p className="w-2/3 mx-auto font-medium mt-3 text-gray-700 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Link
            to="/register"
            className="font-medium text-sky-600 hover:underline"
          >
            Register
          </Link>
        </p>
        <div className="w-max border mx-auto bg-white rounded-full mt-9 hover:bg-slate-100">
          <Link>
            <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-3 font-semibold py-2 w-[300px]">
              <img
                className="w-5"
                src="https://i.ibb.co/Pj0MgcP/google.png"
                alt=""
              />{" "}
              Login with Google
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
