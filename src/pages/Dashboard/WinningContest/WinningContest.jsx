import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const WinningContest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: registers = [] } = useQuery({
    queryKey: ["registers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registers");
      return res.data;
    },
  });

  const userContest = registers.filter(
    (contest) => contest?.email === user?.email
  );
  const wonContest = userContest.filter((data) => data?.winner === "Winner");

  return (
    <div className="my-10 min-h-screen px-2 md:mx-10">
      <Helmet>
        <title>My Winning Contest</title>
      </Helmet>
      <h1 className="text-xl md:text-3xl font-semibold text-left xl:text-center">
        Welcome, <span className="text-blue-700">{user?.displayName}!</span>
      </h1>
      <p className="md:text-lg font-semibold mt-5 text-gray-500 text-left xl:text-center">
        You have achieved success in the following contests:
      </p>
      <div>{wonContest.length > 0 ? 
      <div className="grid xl:grid-cols-2 gap-10 xl:w-max xl:mx-auto my-10">
        {
            wonContest.map(item => <div key={item._id}>
                <h2 className="text-xl font-bold w-[300px] md:w-fit text-center md:text-left"><span className="text-blue-700">Contest:</span> {item?.contestName}</h2>
                <p className="text-green-700 font-bold text-center md:text-left mt-3">You are the {item?.winner}</p>
            </div>)
        }
      </div> 
      : 
      <div className="h-[50vh] flex justify-center items-center"><h2 className="text-lg md:text-xl text-center text-green-700 font-semibold">You have not won any contest yet. Participate now and surprise others by winning!!</h2></div>
      }
      </div>
    </div>
  );
};

export default WinningContest;
