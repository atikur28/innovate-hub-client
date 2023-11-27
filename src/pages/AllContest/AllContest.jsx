import { useQuery } from "@tanstack/react-query";
import Navbar from "../SharedPages/Navbar/Navbar";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Contest from "./Contest/Contest";
import { Helmet } from "react-helmet-async";

const AllContest = () => {
  const axiosPublic = useAxiosPublic();
  const { data: contests = [] } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests");
      return res.data;
    },
  });
  const confirmedContests = contests.filter(item => item.status === "Confirmed");
  return (
    <div>
      <Helmet>
        <title>All Contest</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="my-10">
        <h2 className="text-3xl font-bold text-center mb-10"><em>All Contests</em></h2>
        <div className="w-max mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {
                confirmedContests.map(item => <Contest key={item._id} item={item}></Contest>)
            }
        </div>
      </div>
    </div>
  );
};

export default AllContest;
