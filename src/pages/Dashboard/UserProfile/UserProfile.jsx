import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../../../firebase/firebase.config";
import Swal from "sweetalert2";
import { PieChart, Pie, Cell, Legend } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const auth = getAuth(app);

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  const { data: registers = [] } = useQuery({
    queryKey: ["registers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registers");
      return res.data;
    },
  });

  const recentUser = registers.filter(data => data?.email === user?.email);
  const pendingWon = recentUser.filter(item => item.winner === "Pending");
  const winnerWon = recentUser.filter(item => item.winner === "Winner");
  const pendingValue = pendingWon.length;
  const winnerValue = winnerWon.length;

  const data = [
    { name: "Not Won", value: pendingValue },
    { name: "Won", value: winnerValue },
  ];

  const COLORS = ["red", "#00C49F"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
    <div className="my-10 min-h-screen">
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      {users.map(
        (item) =>
          item?.email === user?.email && (
            <div key={item?._id} className="my-10 mx-[5px] md:mx-2 2xl:ml-10">
              <h2 className="text-lg font-bold">
                Your name: {item?.name}
              </h2>
              <div>
                <PieChart width={315} height={315}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend></Legend>
                </PieChart>
              </div>
              <div className="max-w-[1000px] flex flex-col md:flex-row gap-5 mt-5">
                <div className="md:w-1/2">
                  <h3 className="md:text-xl font-bold mb-2">
                    Update your name:
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
                    Update your photo:
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
