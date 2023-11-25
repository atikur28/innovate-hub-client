import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ManageUser = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUserUpdate = (id) => {
    const updatedRole = { selectedOption };
    axiosSecure.patch(`/users/role/${id}`, updatedRole).then((res) => {
        refetch();
        if(res.data.modifiedCount > 0){
          Swal.fire({
              title: "Good job!",
              text: "You have updated the role!",
              icon: "success"
            });
        }
      });
  };

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
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
        <title>Manage User</title>
      </Helmet>
      <h2 className="text-xl md:text-3xl font-bold text-center">
        <em>Manage Users</em>
      </h2>
      <div className="max-w-[1000px] mx-auto md:p-3 lg:p-10 bg-white mt-10 rounded">
        <h3 className="text-2xl font-bold text-center">
          Total Users: {users?.length}
        </h3>
        <div>
          <div className="overflow-x-auto">
            <table className="table mt-5">
              <thead>
                <tr className="font-bold bg-blue-400 text-white">
                  <th></th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>ACTION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, idx) => (
                  <tr key={item._id}>
                    <th>{idx + 1}</th>
                    <td className="text-[#737373] font-bold">{item.name}</td>
                    <td className="text-[#737373] font-bold">{item.email}</td>
                    <td>{item?.role}</td>
                    <td>
                      <select
                        onChange={handleSelect}
                        value={selectedOption}
                      >
                        <option value="admin">admin</option>
                        <option value="creator">creator</option>
                        <option value="user">user</option>
                      </select>
                      <button className="btn btn-sm" onClick={() => handleUserUpdate(item._id)}>
                        Save
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="font-semibold"
                      >
                        Remove
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

export default ManageUser;
