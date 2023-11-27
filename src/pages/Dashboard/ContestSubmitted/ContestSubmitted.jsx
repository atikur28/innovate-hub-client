import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const ContestSubmitted = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: registers = [], refetch } = useQuery({
    queryKey: ["registers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registers");
      return res.data;
    },
  });

  const handleWinner = (id) => {
    const filteredData = registers.find((data) => data?._id === id);
    const contestName = filteredData?.contestName;
    const winnerExist = registers.filter((data) => data?.contestName === contestName);
    const isExist = winnerExist.find((item) => item?.winner === "Winner");

    if (!isExist) {
      const updatedWinner = { confirmation: "Winner" };
      axiosSecure.patch(`/registers/${id}`, updatedWinner).then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Good job!",
            text: `Winner has been selected!`,
            icon: "success",
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Winner already selected for this contest!",
      });
    }
  };

  return (
    <div className="my-10 min-h-screen">
      <Helmet>
        <title>Contest Submitted</title>
      </Helmet>
      <h2 className="text-xl md:text-3xl font-bold text-center">
        <em>Submitted Contest</em>
      </h2>
      <div className="overflow-x-auto">
        <table className="table mt-5">
          <thead>
            <tr className="font-bold bg-blue-400 text-white">
              <th></th>
              <th>CONTEST NAME</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>TASK</th>
              <th>WINNER</th>
            </tr>
          </thead>
          <tbody>
            {registers.map(
              (item) =>
                item?.creatorEmail === user?.email && (
                  <tr key={item._id}>
                    <th></th>
                    <td id="contestName" className="text-[#737373] font-bold">
                      {item?.contestName}
                    </td>
                    <td className="text-[#737373] font-bold">{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>Done</td>
                    <td>
                      {item?.winner === "Winner" ? (
                        <p className="text-green-600 font-bold">Winner</p>
                      ) : (
                        <button
                          onClick={() => handleWinner(item._id)}
                          className="btn btn-sm bg-gray-600 text-white"
                        >
                          {item?.winner}
                        </button>
                      )}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestSubmitted;
