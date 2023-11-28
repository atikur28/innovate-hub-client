import Footer from "../SharedPages/Footer/Footer";
import Navbar from "../SharedPages/Navbar/Navbar";
import bannerImg from "../../assets/images/home/article-banner.jpg";
import { Helmet } from "react-helmet-async";

const RolesResponsibility = () => {
  return (
    <div>
      <Helmet>
        <title>Roles and Responsibility</title>
      </Helmet>
      <div className="bg-blue-100">
        <Navbar></Navbar>
      </div>
      <div
        className="md:h-[50vh] flex justify-center items-center py-10"
        style={{
          background: `url(${bannerImg}), linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))`,

          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
        }}
      >
        <div>
          <h1 className="text-xl md:text-4xl lg:text-5xl text-center font-bold text-white">
            Welcome to InnovateHub
          </h1>
          <p className="text-white text-center font-medium max-w-[800px] mx-auto mt-3">
            Where creativity meets recognition! Our platform thrives on
            collaboration between three key roles: Admins, Contest Creators, and
            Users. Each role plays a crucial part in shaping the vibrant
            community of creative minds and fostering an environment of
            innovation and celebration.
          </p>
        </div>
      </div>
      <div className="md:w-11/12 xl:w-max mx-auto grid grid-cols-1 xl:grid-cols-3 gap-10 px-2 py-10">
        <div className="xl:w-[300px] mx-auto">
          <h3 className="text-sky-300 text-lg text-center font-bold">Admin</h3>
          <p className="text-justify font-medium">
            As an Admin, you hold the reins of the platform, ensuring its smooth
            operation and maintaining the integrity of the contests. Your
            responsibilities include approving contests submitted by creators,
            managing user roles, and overseeing the overall contest landscape.
          </p>
        </div>
        <div className="xl:w-[300px] mx-auto">
          <h3 className="text-green-300 text-lg text-center font-bold">
            Contest Creators
          </h3>
          <p className="text-justify font-medium">
            Contest Creators are the architects of the creative challenges that
            define ContestHub. If you are a Contest Creator, you have the power
            to conceive and bring to life engaging contests that captivate the
            community.
          </p>
        </div>
        <div className="xl:w-[300px] mx-auto">
          <h3 className="text-orange-400 text-lg text-center font-bold">
            Participants
          </h3>
          <p className="text-justify font-medium">
            Users are the heartbeat of ContestHub, participating in contests,
            providing valuable feedback, and contributing to the vibrant
            community. Whether you are a seasoned participant or a newcomer
            eager to explore creative challenges.
          </p>
        </div>
      </div>
      <div className="px-2 xl:w-1/2 text-center mx-auto">
        <p className="text-lg font-semibold text-slate-500 mb-10">
          <span className="text-4xl">T</span>hank you for joining our creative community. Whether you are shaping
          contests, participating, or guiding the platform, you are an essential
          part of InnovateHub. Together, let uss celebrate innovation,
          collaboration, and the joy of creativity. Welcome to the heart of
          inspiration!
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RolesResponsibility;
