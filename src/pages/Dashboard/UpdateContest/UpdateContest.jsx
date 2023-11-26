import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateContest = () => {
  const { register, handleSubmit } = useForm();
  const {
    _id,
    name,
    image,
    contestPrice,
    prizeMoney,
    tag,
    deadline,
    description,
    instruction,
  } = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    const updatedInfo = {
      name: data.contestName,
      contestPrice: data.contestPrice,
      prizeMoney: data.prizeMoney,
      image: data.image,
      tag: data.tag,
      deadline: data.deadline,
      description: data.description,
      instruction: data.instruction,
    };
    const contestRes = await axiosSecure.put(`/contests/${_id}`, updatedInfo);
    if (contestRes.data.modifiedCount > 0) {
      Swal.fire({
        title: "Good job!",
        text: "You have updated that contest",
        icon: "success",
      });
    }
  };
  return (
    <div className="my-10 min-h-screen">
      <Helmet>
        <title>Update Contest</title>
      </Helmet>
      <h2 className="text-xl md:text-3xl font-bold text-center">
        <em>Update Contest</em>
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
            {...register("contestName")}
            defaultValue={name}
            placeholder="Contest Name"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
          <div>
            <h3 className="md:text-lg font-bold mb-2">Contest Price</h3>
            <input
              className="w-full py-2.5 px-3 rounded-md"
              type="text"
              {...register("contestPrice")}
              defaultValue={contestPrice}
              placeholder="Contest Price"
            />
          </div>
          <div>
            <h3 className="md:text-lg font-bold mb-2">Prize money</h3>
            <input
              className="w-full py-2.5 px-3 rounded-md"
              type="text"
              {...register("prizeMoney")}
              defaultValue={prizeMoney}
              placeholder="Prize money"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
          <div>
            <h3 className="md:text-lg font-bold mb-2">Image</h3>
            <input
              className="w-full py-2.5 px-3 rounded-md"
              type="text"
              {...register("image")}
              defaultValue={image}
              placeholder="Image url"
            />
          </div>
          <div>
            <h3 className="md:text-lg font-bold mb-2">Tag</h3>
            <select
              {...register("tag")}
              defaultValue={tag}
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
            {...register("deadline")}
            defaultValue={deadline}
            placeholder="Contest Deadline"
          />
        </div>
        <div className="my-5">
          <h3 className="md:text-lg font-bold mb-2">Contest Description</h3>
          <input
            className="w-full py-2.5 px-3 rounded-md"
            type="text"
            {...register("description")}
            defaultValue={description}
            placeholder="Contest Description"
          />
        </div>
        <div className="mb-5">
          <h3 className="md:text-lg font-bold mb-2">
            Task Submission Instruction
          </h3>
          <textarea
            className="textarea w-full h-40"
            {...register("instruction")}
            defaultValue={instruction}
            placeholder="Instruction"
          ></textarea>
        </div>
        <div className="w-max mx-auto">
          <button className="py-2 px-10 font-bold text-xl bg-blue-500 text-white rounded-md flex justify-center items-center gap-3">
            Update Contest
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContest;
