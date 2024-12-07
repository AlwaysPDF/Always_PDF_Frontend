"use client";

import ScrollToHash from "@/utils/ScrollToHash";
import Hero from "@/components/HomePage/Hero";
import Footer from "@/components/Footer/Footer";

const Home = () => {
  return (
    <main className="">
      <ScrollToHash />
      <div id="home">
        <Hero />
      </div>
      {/* <div id="features">
        <Features />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="pricing">
        <PriceList />
      </div>
      <div id="faq">
        <Faq />
      </div> */}
      {/* <Footer /> */}
    </main>
  );
};

export default Home;
