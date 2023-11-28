import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import ContestInfo from "./ContestInfo/ContestInfo";

const RegisteredContest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: registers = [], refetch } = useQuery({
    queryKey: ["registers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registers");
      return res.data;
    },
  });

  const userRegistered = registers.filter(
    (item) => item?.email === user?.email
  );
  const contests = userRegistered.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  return (
    <div className="my-10 min-h-screen">
      <Helmet>
        <title>Registered Contest</title>
      </Helmet>
      <h2 className="text-xl md:text-3xl font-bold text-center">
        <em>Registered Contest</em>
      </h2>
      <div className="max-w-[1000px] mx-auto md:p-3 lg:p-10 bg-white mt-10 rounded">
        <h3 className="text-2xl font-bold text-center">
          Total Participated: {userRegistered?.length}
        </h3>
        <div className="overflow-x-auto">
          <table className="table mt-5">
            <thead>
              <tr className="font-bold bg-blue-400 text-white">
                <th></th>
                <th>CONTEST NAME</th>
                <th>SUBMITTED</th>
                <th>DEADLINE</th>
                <th>WON</th>
              </tr>
            </thead>
            {contests.map((data) => (
              <ContestInfo
                key={data._id}
                data={data}
                refetch={refetch}
              ></ContestInfo>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegisteredContest;
