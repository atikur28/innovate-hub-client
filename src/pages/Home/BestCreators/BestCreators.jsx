import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const BestCreators = () => {
    const axiosPublic = useAxiosPublic();
    const { data: bestCreator = []} = useQuery({
        queryKey: ["bestCreator"],
        queryFn: async () => {
          const res = await axiosPublic.get('/bestCreator');
          return res.data;
        },
      });
  return (
    <div className="my-16 bg-gray-100 py-10">
      <p className="md:text-xl text-center text-gray-500 font-semibold">
        <em>---Our Best Contest Creator---</em>
      </p>
      <div className="max-w-[1200px] mx-auto">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {bestCreator.map((item) => (
          <SwiperSlide key={item?._id}>
            <div className="md:w-4/5 mx-auto text-center my-10">
              <img className="w-[70px] rounded-full mx-auto mb-2" src={item?.image} alt="" />
              <h3 className="text-4xl font-semibold text-center">
                {item.name}
              </h3>
              <p className="text-lg font-bold mt-2">{item?.contestName} Creator</p>
              <p className="text-gray-500 font-medium mt-3">{item?.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default BestCreators;
