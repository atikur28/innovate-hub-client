import Navbar from "../SharedPages/Navbar/Navbar";
import image from "../../assets/images/home/home-banner-img1.jpg";
import image2 from "../../assets/images/home/home-banner-img2.jpg";
import image3 from "../../assets/images/home/home-banner-img-3.jpg";
import Features from "./Features/Features";
import Spotlight from "./Spotlight/Spotlight";

const Home = () => {
  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const search = form.search.value;
    console.log(search);
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="carousel h-screen w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={image} className="w-full" />
          <div className="absolute flex h-full w-full justify-center items-center text-center bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.6)]">
            <div className="">
              <h1 className="text-3xl md:text-5xl text-white font-bold">
                InnovateHub: Where Creativity Thrives!
              </h1>
              <p className="lg:w-[610px] mx-auto text-white md:font-semibold mt-3 mb-5 lg:mt-5">
                Embark on a coding adventure with InnovateHub. Our Code
                Challenges are designed for enthusiasts of all levels. Join us
                to solve exciting problems, enhance your coding prowess, and
                connect with a vibrant tech community. Ignite your passion for
                coding – InnovateHub, where challenges become opportunities!
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
              <h1 className="text-3xl md:text-5xl text-white font-bold">
                InnovateHub Photo Contest: Capture. Create. Inspire!
              </h1>
              <p className="lg:w-[500px] mx-auto text-white md:font-semibold mt-3 mb-5 lg:mt-5">
                Join our vibrant community and let your lens tell a tale. The
                InnovateHub Photo Contest is your canvas to showcase the
                extraordinary through captivating visuals. Unleash your
                creativity – where every snapshot becomes a masterpiece!
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
              <h1 className="text-3xl md:text-5xl text-white font-bold">
                InnovateHub Web Design Challenge: Craft the Digital Future!
              </h1>
              <p className="lg:w-[500px] mx-auto text-white md:font-semibold mt-3 mb-5 lg:mt-5">
                Elevate your coding game at InnovateHub. Join fellow enthusiasts
                in our Code Challenge, where innovation meets lines of code.
                Unleash your skills, tackle exciting problems, and be part of a
                dynamic coding community. InnovateHub Code Challenge – where
                brilliance takes center stage!
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
      <Spotlight></Spotlight>
      <Features></Features>
    </div>
  );
};

export default Home;
