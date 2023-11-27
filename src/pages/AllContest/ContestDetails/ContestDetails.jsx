import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../../SharedPages/Navbar/Navbar";
import CountdownTimer from "./CountdownTimer/CountdownTimer";
import { Helmet } from "react-helmet-async";
import useAdmin from "../../../hooks/useAdmin";
import useCreator from "../../../hooks/useCreator";

const ContestDetails = () => {
  const {
    _id,
    image,
    name,
    contestPrice,
    prizeMoney,
    participated,
    tag,
    deadline,
    description,
    instruction,
  } = useLoaderData();
  const [isAdmin] = useAdmin();
  const [isCreator] = useCreator();

  return (
    <div>
      <Helmet>
        <title>Contest Details</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">
          <em>Contest Details</em>
        </h2>
        <div className="w-max mx-auto p-2 md:p-5 border rounded bg-white">
          <img
            className="w-[280px] md:w-[600px] xl:w-[800px]"
            src={image}
            alt=""
          />
          <h2 className="w-[280px] md:w-fit md:text-2xl font-bold">{name}</h2>
          <h4 className="text-base md:text-lg font-medium">
            Participated:{" "}
            <span className="text-green-600">{participated} person</span>
          </h4>
          <h4 className="text-base md:text-lg text-blue-600">#{tag}</h4>
          <p className="font-semibold">Registration Fee: ${contestPrice}</p>
          <p className="font-semibold">Prize Money: ${prizeMoney}</p>
          <p className="w-[280px] md:w-[600px] xl:w-[800px] font-medium text-gray-500 mb-2">
            {description}
          </p>
          <p className="w-[280px] md:w-[600px] xl:w-[800px] font-medium">
            <span className="text-blue-500">Instruction:</span> {instruction}
          </p>
          <div>
            <h2 className="font-semibold text-red-700 text-center mt-2">
              Time left to register
            </h2>
            <CountdownTimer deadline={deadline}></CountdownTimer>
          </div>
          <div className="my-3">
            {isAdmin || isCreator ? (
              <button
                disabled
                className="btn w-full bg-green-700 hover:bg-green-800 text-white font-semibold"
              >
                Register
              </button>
            ) : (
              <Link to={`/payment/${_id}`}>
                <button className="btn w-full bg-green-700 hover:bg-green-800 text-white font-semibold">
                  Register
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
