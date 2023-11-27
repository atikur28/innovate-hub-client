import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const ManageContest = () => {
  const axiosSecure = useAxiosSecure();
  const { data: contests = [], refetch } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  const handleConfirmContest = (id) => {
    const oldCount = contests.find(data => data._id === id);
    const newCount = oldCount.participated;
    const updatedStatus = { confirmation: "Confirmed", newCount };
    axiosSecure.patch(`/contests/${id}`, updatedStatus).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Good job!",
          text: "You have approved the contest!",
          icon: "success",
        });
        refetch();
      }
    });
  };

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
              text: "This has been deleted.",
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
        <title>Manage Contest</title>
      </Helmet>
      <h2 className="text-xl md:text-3xl font-bold text-center">
        <em>Manage Contest</em>
      </h2>
      <div className="max-w-[1000px] mx-auto md:p-3 lg:p-10 bg-white mt-10 rounded">
        <h3 className="text-2xl font-bold text-center">
          Total Contests: {contests?.length}
        </h3>
        <div>
          <div className="overflow-x-auto">
            <table className="table mt-5">
              <thead>
                <tr className="font-bold bg-blue-400 text-white">
                  <th></th>
                  <th>CONTEST NAME</th>
                  <th>CREATOR EMAIL</th>
                  <th>ACTION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {contests?.map((item, idx) => (
                  <tr key={item?._id}>
                    <th>{idx + 1}</th>
                    <td className="text-[#737373] font-bold">{item?.name}</td>
                    <td className="text-[#737373] font-bold">{item?.email}</td>
                    <td>
                      {item?.status === "Confirmed" ? (
                        <p className="text-green-600 font-bold">Confirmed</p>
                      ) : (
                        <button
                          onClick={() => handleConfirmContest(item._id)}
                          className="btn btn-sm bg-gray-600 text-white"
                        >
                          {item?.status}
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteContest(item._id)}
                        className="bg-red-600 text-white py-1 px-1.5 rounded"
                      >
                        <MdDeleteOutline className="text-2xl"></MdDeleteOutline>
                      </button>
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

export default ManageContest;
