const Spotlight = () => {
  return (
    <div className="my-10 w-4/5 mx-auto">
      <h2 className="text-xl md:text-4xl font-bold text-center">
        Spotlight Showcase
      </h2>
      <p className="text-gray-500 text-center max-w-[600px] mx-auto mt-5">
        Discover the brilliance of our featured contests in the Spotlight
        Showcase. These contests stand out for their innovation, creativity, and
        community engagement. Dive into the extraordinary and be inspired to
        participate!
      </p>
      <div className="mt-5 lg:w-1/2">
        <h3 className="text-sm md:text-xl font-bold">Carousel Display</h3>
        <p className="font-semibold">
          A visually appealing carousel showcasing 3-5 spotlighted contests.
          Each carousel item includes:{" "}
          <ul>
            <li>1. Eye-catching Contest Image</li>
            <li>2. Contest Name</li>
            <li>3. Unique Design Elements</li>
            <li>4. Brief Contest Description</li>
          </ul>
        </p>
      </div>
      <div className="mt-5 md:ml-16 lg:w-1/2">
        <h3 className="text-sm md:text-xl font-bold">Engaging Content</h3>
        <p className="font-semibold">
          Beneath the carousel, feature engaging content that provides
          additional information about the spotlighted contests.Include user
          testimonials, quotes from contest creators, or snippets of participant
          success stories related to these contests.Use a mix of vibrant
          visuals, text, and call-to-action buttons.
        </p>
      </div>
      <div className="mt-5 lg:w-1/2">
        <h3 className="text-sm md:text-xl font-bold">Interactive Elements</h3>
        <p className="font-semibold">
          Add interactive elements like hover effects or animations to make the
          section dynamic and engaging.Consider incorporating subtle transitions
          between carousel items for a smooth user experience.
        </p>
      </div>
      <div className="mt-5 md:ml-16 lg:w-1/2">
        <h3 className="text-sm md:text-xl font-bold">Call-to-Action</h3>
        <p className="font-semibold">
        Encourage users to explore beyond the spotlighted contests and discover the diverse range of challenges on InnovateHub.
        </p>
      </div>
    </div>
  );
};

export default Spotlight;
