import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Contest = ({item}) => {
    const {_id, image, name, participated, description} = item || {};
    return (
        <div className="flex flex-col pb-5 border rounded p-2">
            <img className="w-[280px] lg:w-[380px] xl:w-[400px] h-[200px] lg:h-[250px] rounded" src={image} alt="" />
            <h3 className="text-lg md:text-xl font-bold w-[280px] lg:w-[380px] xl:w-[400px]">{name}</h3>
            <h4 className="text-base md:text-lg font-medium">Participated: <span className="text-green-600">{participated} person</span></h4>
            <p className="grow w-[280px] lg:w-[380px] xl:w-[400px] font-medium text-gray-500 mb-2">{description.slice(0, 90)} <span className="text-red-400">read more..</span></p>
            <Link to={`/contestDetails/${_id}`}><button className="btn btn-sm bg-blue-400 hover:bg-blue-400 text-white font-semibold w-full">Details</button></Link>
        </div>
    );
};

Contest.propTypes = {
    item: PropTypes.object,
}

export default Contest;