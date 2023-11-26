import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../../../firebase/firebase.config";
import Swal from "sweetalert2";

const auth = getAuth(app);

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  const handleUpdateName = (id) => {
    const name = document.getElementById("userName").value;
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then((result) => {
      console.log(result);
      const updateUser = { userName: name };
      axiosPublic.patch(`/users/${id}`, updateUser).then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Good job!",
            text: "You have updated successfully!",
            icon: "success",
          });
          refetch();
          document.getElementById("userName").value = "";
        }
      });
    });
  };

  const handleUpdatePhoto = () => {
    const photo = document.getElementById("photoLink").value;
    updateProfile(auth.currentUser, {
      photoURL: photo,
    }).then((result) => {
      console.log(result);
      Swal.fire({
        title: "Good job!",
        text: "You have updated successfully!",
        icon: "success",
      });
      refetch();
      document.getElementById("photoLink").value = "";
    });
  };

  return (
    <div>
      <div></div>
      {users.map(
        (item) =>
          item?.email === user?.email && (
            <div key={item?._id} className="my-10 mx-2 2xl:ml-10">
              <h2 className="text-lg font-bold mb-5">
                User name: {item?.name}
              </h2>
              <div className="max-w-[1000px] flex flex-col md:flex-row gap-5">
                <div className="md:w-1/2">
                  <h3 className="md:text-xl font-bold mb-2">
                    Update user name:
                  </h3>
                  <input
                    className="py-2 px-2 border w-full rounded"
                    placeholder="User name"
                    type="text"
                    id="userName"
                  />
                  <div className="w-max mx-auto my-3">
                    <button
                      onClick={() => handleUpdateName(item?._id)}
                      className="py-2 px-5 bg-green-600 text-white rounded"
                    >
                      Update Name
                    </button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="md:text-xl font-bold mb-2">
                    Update user photo:
                  </h3>
                  <input
                    className="py-2 px-2 border w-full rounded"
                    placeholder="Photo link"
                    type="text"
                    id="photoLink"
                  />
                  <div className="w-max mx-auto my-3">
                    <button
                      onClick={handleUpdatePhoto}
                      className="py-2 px-5 bg-green-600 text-white rounded"
                    >
                      Update Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default UserProfile;
