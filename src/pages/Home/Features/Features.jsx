import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const Features = () => {
  const [scrollTrigger, setScrollTrigger] = useState(false);
  return (
    <div className="container mx-auto my-8">
      <ScrollTrigger
        onEnter={() => setScrollTrigger(true)}
        onExit={() => setScrollTrigger(false)}
      >
        <div className="border-5 border-red-700 relative w-full">
          <div className=" h-[40vh] bg-[url('https://i.ibb.co/LNx0JCF/brooke-cagle-g1-Kr4-Ozfoac-unsplash.jpg')] bg-cover bg-center opacity-40"></div>
          <div className="absolute top-4 space-y-3 md:space-y-0 md:top-[45%] w-full md:flex md:justify-around text-center md:items-center md:gap-5">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                {scrollTrigger && (
                  <CountUp
                    className="text-[#FF444A]"
                    start={0}
                    end={10}
                    duration={2.50}
                  />
                )}
                +
              </h2>
              <p className="text-3xl md:text-4xl font-bold text-black">
                Contests
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                {scrollTrigger && (
                  <CountUp
                    className="text-[#FF444A]"
                    start={0}
                    end={6000}
                    duration={2.50}
                  />
                )}
                +
              </h2>
              <p className="text-3xl md:text-4xl font-bold text-black">
                Rated
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                {scrollTrigger && (
                  <CountUp
                    className="text-[#FF444A] ml-3"
                    start={0}
                    end={15642}
                    duration={2.50}
                  />
                )}
                +
              </h2>
              <p className="text-3xl md:text-4xl font-bold text-black">
                Viewers
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                {scrollTrigger && (
                  <CountUp
                    className="text-[#FF444A]"
                    start={0}
                    end={97}
                    duration={2.50}
                  />
                )}
              </h2>
              <p className="text-3xl md:text-4xl font-bold text-black">
                Winner
              </p>
            </div>
          </div>
        </div>
        {/* </div> */}
      </ScrollTrigger>
    </div>
  );
};

export default Features;
