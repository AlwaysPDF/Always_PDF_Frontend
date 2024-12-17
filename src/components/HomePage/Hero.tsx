import Image from "next/image";
import Navbar from "../Navbar/Navbar";

const Hero = () => {
  return (
    <section className="bg-black w-full h-auto flex justify-center items-center flex-col">
         {/* <iframe
        src={`/index.html?timestamp=${new Date().getTime()}`}
        title="Embedded Content"
        width="100%"
        // height="500px"
        style={{
          border: "none",
          height: "100vh"
        }}
      ></iframe> */}
      <Navbar />
      <main className="bg-[#021221] h-screen bg-cover w-full ">

        <div className="bg-[url('/assets/heroshadow.svg')] bg-no-repeat bg-center bg-cover h-full w-full flex justify-start items-center flex-col py-16">

        <div>
          <p className="text-white text-sm font-Onest">Introducing AlwaysPDF</p>
        </div>
        <h1 className="text-white text-6xl font-semibold !font-Onest lg:max-w-[40%] text-center">Turn your boring documents into conversations</h1>
        <p className="text-[#E2E8F0] font-Onest text-lg font-medium my-3">
          Innovative. Intuitive. Insightful.
        </p>
        <span className="text-white text-sm font-light">Welcome to your AI-powered PDF companion.</span>
        </div>
      </main>
      <Image src="" alt="" />
    </section>
  );
};

export default Hero;
