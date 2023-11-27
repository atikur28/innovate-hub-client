import { Link, useRouteError } from "react-router-dom";
import Error from "../../assets/images/404.gif";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <img src={Error} alt="" />
      <p className="font-semibold">
        <i>404 {error.statusText || error.message}!!</i>
      </p>
      <div className="mt-5">
        <Link to="/">
          <button className="btn bg-blue-600 hover:bg-blue-600 text-white font-bold">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
