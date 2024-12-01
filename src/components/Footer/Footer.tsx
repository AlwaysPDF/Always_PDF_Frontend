import Image from "next/image";
import footerLogo from "../../../public/assets/coloredLogo.svg";
import bigLogo from "../../../public/assets/bigLogo.svg";

import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebook className="text-white text-2xl" />, links: "" },
    { icon: <FaLinkedin className="text-white text-2xl" />, links: "" },
    { icon: <FaXTwitter className="text-white text-2xl" />, links: "" },
    { icon: <AiFillInstagram className="text-white text-2xl" />, links: "" },
  ];

  const hashLinks = [
    { name: "Home", hashlink: "" },
    { name: "Features", hashlink: "" },
    { name: "How it works", hashlink: "" },
    { name: "Pricing", hashlink: "" },
  ];

  const year = new Date().getFullYear();
  return (
    <section className="flex justify-center items-center w-full bg-basicBlue">
      <div className="w-[80%] llg:w-[95%] flex justify-between llg:justify-center items-start flex-col pt-14">
        <main className="grid lg:grid-cols-4  lsm:grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-start items-start flex-col">
            <Image src={footerLogo} alt="Always PDF White Logo" style={{ filter: "brightness(0) invert(1)" }} priority />
            <div className="flex justify-center items-center gap-6 mt-2">
              {socialLinks?.map((item, i) => (
                <a key={i} href={item?.links}>
                  {item?.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            {hashLinks?.map((item, i) => (
              <p key={i} className="text-white font-Ubuntu text-lg llg:text-base mb-4">
                {item?.name}
              </p>
            ))}
          </div>
          <div>
            {[
              "About EverPDF",
              "Privacy Policy",
              "Terms of Service",
              "Contact Us",
            ]?.map((item, i) => (
              <p key={i} className="text-white font-Ubuntu text-lg llg:text-base mb-4">
                {item}
              </p>
            ))}
          </div>
          <div>
            <p className="text-white text-sm  font-Ubuntu">
              Copyright &copy; {year} alwayspdf.com. All rights reserved
            </p>
          </div>
        </main>
        <main className="mt-16">
          <Image src={bigLogo} alt="Always PDF White Big Logo" priority />
        </main>
      </div>
    </section>
  );
};

export default Footer;
