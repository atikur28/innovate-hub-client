import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CreatedContest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [contestCreator, setContestCreator] = useState([]);
  const { data: contests = [], refetch } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  useEffect(() => {
    if (user) {
      const filteredContest = contests.filter(
        (item) => item?.email === user?.email
      );
      setContestCreator(filteredContest);
    }
  }, [contests, user]);

  const handleDeleteContest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Contest has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="my-10 min-h-screen">
      <Helmet>
        <title>Created Contest</title>
      </Helmet>
      <h2 className="text-xl md:text-3xl font-bold text-center">
        <em>My Created Contest</em>
      </h2>
      <div className="max-w-[1000px] mx-auto md:p-3 lg:p-10 bg-white mt-10 rounded">
        <h3 className="text-2xl font-bold text-center">
          Total Contests: {contestCreator?.length}
        </h3>
        <div>
          <div className="overflow-x-auto">
            <table className="table mt-5">
              <thead>
                <tr className="font-bold bg-blue-400 text-white">
                  <th></th>
                  <th>CONTEST TAG</th>
                  <th>FEE</th>
                  <th>PRIZE</th>
                  <th>ACTION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {contestCreator?.map((item, idx) => (
                  <tr key={item?._id}>
                    <th>{idx + 1}</th>
                    <td className="text-[#737373] font-bold">#{item?.tag}</td>
                    <td className="text-[#737373] font-bold">
                      ${item?.contestPrice}
                    </td>
                    <td className="text-[#737373] font-bold">
                      {item?.prizeMoney}
                    </td>
                    <td>
                      {item?.status === "Confirmed" ? (
                        <button
                          disabled
                          className="btn btn-sm bg-gray-200 text-white"
                        >
                          Update
                        </button>
                      ) : (
                        <Link to={`/dashboard/updateContest/${item?._id}`}>
                          <button className="btn btn-sm bg-blue-500 hover:bg-blue-500 text-white">
                            Update
                          </button>
                        </Link>
                      )}
                    </td>
                    <td>
                      {item?.status === "Confirmed" ? (
                        <button
                          disabled
                          className="bg-gray-200 py-1 px-1.5 rounded"
                        >
                          <MdDeleteOutline className="text-2xl"></MdDeleteOutline>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeleteContest(item?._id)}
                          className="bg-red-600 text-white py-1 px-1.5 rounded"
                        >
                          <MdDeleteOutline className="text-2xl"></MdDeleteOutline>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedContest;
