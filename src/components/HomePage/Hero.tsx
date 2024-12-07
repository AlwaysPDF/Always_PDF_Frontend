import Navbar from "../Navbar/Navbar";

const Hero = () => {
  return (
    <section className="bg-black w-full h-auto flex justify-center items-center flex-col">
         <iframe
        src="/index.html"
        title="Embedded Content"
        width="100%"
        // height="500px"
        style={{
          border: "none",
          height: "100vh"
        }}
      ></iframe>
      {/* <Navbar />
      <div className="bg-[url('/assets/heroSecton.svg')] h-full bg-no-repeat bg-center bg-cover w-full flex justify-center items-center flex-col">
        <div>
          <p className="text-white text-sm font-Onest">Introducing AlwaysPDF</p>
        </div>
        <h1 className="text-white text-4xl font-semibold !font-Onest">Turn your boring documents into conversations</h1>
        <p className="text-[#E2E8F0] font-Onest text-sm font-light">
          Innovative. Intuitive. Insightful. Welcome to your AI-powered PDF
          companion
        </p>
      </div> */}
    </section>
  );
};

export default Hero;
