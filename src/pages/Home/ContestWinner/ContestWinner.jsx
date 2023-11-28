import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ContestWinner = () => {
  const axiosSecure = useAxiosSecure();
  const { data: registers = [] } = useQuery({
    queryKey: ["registers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registers");
      return res.data;
    },
  });

  const contestWinner = registers.filter((item) => item?.winner === "Winner");
  console.log(contestWinner);

  return (
    <Swiper
      //   slidesPerView={3}
      //   spaceBetween={30}
      //   freeMode={true}
      //   pagination={{
      //     clickable: true,
      //   }}
      //   modules={[FreeMode, Pagination]}
      //   className="mySwiper"
      className="mySwiper my-10"
      breakpoints={{
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      }}
    >
      {contestWinner.slice(0, 4).map((data) => (
        <SwiperSlide className="bg-base-200 py-10" key={data._id}>
          <img
            className="w-[300px] lg:w-[450px] h-[200px] lg:h-[250px] mx-auto"
            src={data?.contestImage}
            alt=""
          />
          <p className="lg:text-xl font-bold text-center">Winner: {data?.name}</p>
          <p className="text-green-600 font-bold text-center">Prize Won: ${data?.prizeMoney}</p>
          <p className="font-bold text-center">Participated: {data?.participated} person</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ContestWinner;
