import { Link, useNavigate } from "react-router-dom";
import Navbar from "../SharedPages/Navbar/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    setRegisterError('');

    if (password.length < 6) {
        setRegisterError("Password should be in 6 character!");
        return;
      } else if (!/[A-Z]/.test(password)) {
        setRegisterError(
          "Your password should have at least one upper case character!"
        );
        return;
      } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)) {
        setRegisterError(
          "Your password should have at least one special character!"
        );
        return;
      }
    
    createUser(email, password)
      .then(result => {
        Swal.fire({
            title: "Good job!",
            text: "You have registered successfully!",
            icon: "success"
          });
        updateProfile(result.user, {
            displayName: name,
            photoURL: photo,
          })
          .then(result => {
            console.log(result.user);
          })
          .catch(error => {
            console.log(error);
          })
          form.reset();
          navigate("/");
      })
      .catch(error => {
        setRegisterError(error);
      })
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="md:w-3/5 md:mx-auto my-10 py-10 bg-blue-50 rounded mx-2">
        <h2 className="text-2xl font-bold text-center">
          Register to your account
        </h2>
        <form onSubmit={handleRegister} className="w-full">
          <div className="w-2/3 mx-auto mt-5">
            <h3 className="text-lg font-semibold mb-1">Your name</h3>
            <input
              className="w-full py-1.5 px-2 rounded border border-gray-300"
              placeholder="Your name"
              type="text"
              name="name"
              required
            />
          </div>
          <div className="w-2/3 mx-auto mt-5">
            <h3 className="text-lg font-semibold mb-1">Photo Url</h3>
            <input
              className="w-full py-1.5 px-2 rounded border border-gray-300"
              placeholder="Photo link"
              type="text"
              name="photo"
              required
            />
          </div>
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
              Register
            </button>
          </div>
        </form>
        {registerError && (
          <p className="text-red-600 font-semibold text-center">
            {registerError}
          </p>
        )}
        <p className="w-2/3 mx-auto font-medium mt-3 text-gray-700 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Link
            to="/login"
            className="font-medium text-sky-600 hover:underline"
          >
            Login
          </Link>
        </p>
        <div className="w-max border mx-auto bg-white rounded-full mt-9 hover:bg-slate-100">
          <Link>
            <button className="flex items-center justify-center gap-3 font-semibold py-2 w-[300px]">
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

export default Register;
