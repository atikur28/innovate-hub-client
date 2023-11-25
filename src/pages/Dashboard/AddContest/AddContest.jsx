import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddContest = () => {
  const { register, handleSubmit } = useForm();
  const {user} = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    if (res.data.success) {
      const contestInfo = {
        name: data.contestName,
        contestPrice: data.contestPrice,
        prizeMoney: data.prizeMoney,
        image: res.data.data.display_url,
        email: user?.email,
        tag: data.tag,
        status: 'Pending',
        participated: 0,
        deadline: data.deadline,
        description: data.description,
        instruction: data.instruction,
      };
      const contestRes = await axiosSecure.post('/contests', contestInfo);
      if(contestRes.data.insertedId){
        Swal.fire({
          title: "Good job!",
          text: "You have added that contest",
          icon: "success"
        });
      }
    }
  };

  return (
    <div className="my-10 min-h-screen">
      <Helmet>
        <title>Add Contest</title>
      </Helmet>
      <h2 className="text-xl md:text-3xl font-bold text-center">
        <em>Add Contest</em>
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-11/12 md:mx-auto bg-blue-50 p-2.5 md:p-5 xl:p-8 my-10"
      >
        <div>
          <h3 className="md:text-lg font-bold mb-2">Contest Name</h3>
          <input
            className="w-full py-2.5 px-3 rounded-md"
            type="text"
            {...register("contestName", { required: true })}
            placeholder="Contest Name"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
          <div>
            <h3 className="md:text-lg font-bold mb-2">Contest Price</h3>
            <input
              className="w-full py-2.5 px-3 rounded-md"
              type="text"
              {...register("contestPrice", { required: true })}
              placeholder="Contest Price"
            />
          </div>
          <div>
            <h3 className="md:text-lg font-bold mb-2">Prize money</h3>
            <input
              className="w-full py-2.5 px-3 rounded-md"
              type="text"
              {...register("prizeMoney", { required: true })}
              placeholder="Prize money"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
          <div className="flex items-center">
            <input
              type="file"
              {...register("image", { required: true })}
              className="w-full max-w-xs"
            />
          </div>
          <div>
            <h3 className="md:text-lg font-bold mb-2">Tag</h3>
            <select
              {...register("tag", { required: true })}
              className="w-full py-2.5 px-3 rounded-md"
            >
              <option value="business">business</option>
              <option value="medical">medical</option>
              <option value="article">article</option>
              <option value="gaming">gaming</option>
            </select>
          </div>
        </div>
        <div>
          <h3 className="md:text-lg font-bold mb-2">Contest Deadline</h3>
          <input
            className="w-full py-2.5 px-3 rounded-md"
            type="date"
            {...register("deadline", { required: true })}
            placeholder="Contest Deadline"
          />
        </div>
        <div className="my-5">
          <h3 className="md:text-lg font-bold mb-2">Contest Description</h3>
          <input
            className="w-full py-2.5 px-3 rounded-md"
            type="text"
            {...register("description", { required: true })}
            placeholder="Contest Description"
          />
        </div>
        <div className="mb-5">
          <h3 className="md:text-lg font-bold mb-2">
            Task Submission Instruction
          </h3>
          <textarea
            className="textarea w-full h-40"
            {...register("instruction", { required: true })}
            placeholder="Instruction"
          ></textarea>
        </div>
        <div className="w-max mx-auto">
          <button className="py-2 px-10 font-bold text-xl bg-blue-500 text-white rounded-md flex justify-center items-center gap-3">
            Add Contest
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContest;
