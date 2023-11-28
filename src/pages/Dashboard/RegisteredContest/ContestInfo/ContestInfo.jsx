import PropTypes from "prop-types";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContestInfo = ({ data, refetch }) => {
  const { _id, contestName, status, deadline, winner } = data || {};
  const axiosSecure = useAxiosSecure();

  const isDeadlinePassed = new Date(deadline) < new Date();

  const handleSubmit = (id) => {
    const updatedInfo = { status: "Done" };
    axiosSecure.put(`/registers/${id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Good job!",
          text: "You have been submitted the task!",
          icon: "success",
        });
        refetch();
      }
    });
  };
  return (
    <tbody>
      <tr>
        <td></td>
        <td className="text-[#737373] font-bold">{contestName}</td>
        <td>
          {isDeadlinePassed ? (
            <button disabled className="btn btn-xs font-bold">
              Time Passed
            </button>
          ) : (
            <button
              onClick={() => handleSubmit(_id)}
              className="btn btn-xs font-bold"
            >
              {status}
            </button>
          )}
        </td>
        <td className="font-semibold">{deadline}</td>
        <td className="font-semibold">{winner}</td>
      </tr>
    </tbody>
  );
};

ContestInfo.propTypes = {
  data: PropTypes.object,
  refetch: PropTypes.node,
};

export default ContestInfo;
