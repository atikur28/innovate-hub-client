import Navbar from "../SharedPages/Navbar/Navbar";
import image from "../../assets/images/home/business-banner.jpg";
import image2 from "../../assets/images/home/medical-banner.webp";
import image3 from "../../assets/images/home/article-banner.jpg";
import Features from "./Features/Features";
import Spotlight from "./Spotlight/Spotlight";
import { Helmet } from "react-helmet-async";
import PopularContest from "./PopularContest/PopularContest";
import { useLoaderData } from "react-router-dom";
import BestCreators from "./BestCreators/BestCreators";

const Home = () => {
  const totalContests = useLoaderData();
  const sortedContestsData = [...totalContests].sort(
    (a, b) => b.participated - a.participated
  );

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const search = form.search.value;
    console.log(search);
  };
  return (
    <div>
      <Helmet>
        <title>Home | InnovateHub</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="carousel h-screen md:h-[80vh] w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={image} className="w-full" />
          <div className="absolute flex h-full w-full justify-center items-center text-center bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.6)]">
            <div className="">
              <h1 className="text-xl md:text-3xl text-white font-bold">
                InnovateHub: Where Creativity Thrives!
              </h1>
              <p className="lg:w-[610px] mx-auto text-white md:font-semibold mt-3 mb-5 lg:mt-5">
                Dream, Compete, Win! 🚀 Join Our Business Contest Now. Elevate
                Your Ideas, Win Prizes, and Connect with Visionaries.
                #BusinessContest 🏆✨
              </p>
              <form onSubmit={handleSearch} className="join">
                <input
                  type="text"
                  name="search"
                  placeholder="Search here"
                  className="input input-bordered join-item"
                />
                <button className="btn bg-green-600 hover:bg-green-600 text-white join-item">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 bottom-0 left-5 right-5">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src={image2} className="w-full" />
          <div className="absolute flex h-full w-full justify-center items-center text-center bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.6)]">
            <div className="">
              <h1 className="text-xxl md:text-3xl text-white font-bold">
                InnovateHub Medical Contest
              </h1>
              <p className="lg:w-[500px] mx-auto text-white md:font-semibold mt-3 mb-5 lg:mt-5">
                Heal the Future! 🌡️ Join Our Medical Contest for Innovations in
                Healthcare. Showcase Your Breakthroughs, Win Prestigious Prizes,
                and Connect with Medical Pioneers. Your Ideas Can Save Lives!
                #MedicalInnovation 🏥💡 #HealthcareChallenge
              </p>
              <form onSubmit={handleSearch} className="join">
                <input
                  type="text"
                  name="search"
                  placeholder="Search here"
                  className="input input-bordered join-item"
                />
                <button className="btn bg-green-600 hover:bg-green-600 text-white join-item">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 bottom-0 left-5 right-5">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src={image3} className="w-full" />
          <div className="absolute flex h-full w-full justify-center items-center text-center bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.6)]">
            <div className="">
              <h1 className="text-xl md:text-3xl text-white font-bold">
                InnovateHub Article Writing Contest
              </h1>
              <p className="lg:w-[500px] mx-auto text-white md:font-semibold mt-3 mb-5 lg:mt-5">
                Pen Power Unleashed! 🖋️ Dive into our Article Writing Contest.
                Craft compelling stories, share your unique perspectives, and
                stand a chance to win recognition and rewards. Let your words
                paint a masterpiece! 📝✨ #ArticleWritingContest
                #WordsmithsUnite
              </p>
              <form onSubmit={handleSearch} className="join">
                <input
                  type="text"
                  name="search"
                  placeholder="Search here"
                  className="input input-bordered join-item"
                />
                <button className="btn bg-green-600 hover:bg-green-600 text-white join-item">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 bottom-0 left-5 right-5">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          <em>Popular Contests</em>
        </h2>
        <div className="w-max mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {sortedContestsData.slice(0, 6).map((sorted) => (
            <PopularContest key={sorted._id} sorted={sorted}></PopularContest>
          ))}
        </div>
      </div>
      <BestCreators></BestCreators>
      <Spotlight></Spotlight>
      <Features></Features>
    </div>
  );
};

export default Home;
