"use client";

import ScrollToHash from "@/utils/ScrollToHash";
import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import PriceList from "@/components/LandingPage/PriceList";
import Faq from "@/components/LandingPage/Faq";
import Footer from "@/components/Footer/Footer";

const Home = () => {
  return (
    <main>
      <ScrollToHash />
      <div id="home">
        <Hero />
      </div>
      <div id="features">
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
      </div>
      <Footer />
    </main>
  );
};

export default Home;
