import Image from "next/image";
import { ReactNode } from "react";
import footerLogo from "../../../public/assets/coloredLogo.svg";
// import bigLogo from "../../../public/assets/bigLogo.svg";

import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

type SocialLink = {
  icon: ReactNode; // To handle JSX elements like icons
  link: string;
};

type HashLink = {
  name: string;
  hashLink: string;
};

const Footer = () => {
  const socialLinks: SocialLink[] = [
    { icon: <FaFacebook className="text-white text-2xl" />, link: "#" },
    {
      icon: <FaLinkedin className="text-white text-2xl" />,
      link: "https://www.linkedin.com/company/alwayspdf",
    },
    { icon: <FaXTwitter className="text-white text-2xl" />, link: "#" },
    { icon: <AiFillInstagram className="text-white text-2xl" />, link: "https://www.instagram.com/alwayspdf/" },
  ];

  const hashLinks: HashLink[] = [
    { name: "Home", hashLink: "#" },
    { name: "Features", hashLink: "#" },
    { name: "How it works", hashLink: "#" },
    { name: "Pricing", hashLink: "#" },
  ];

  const year = new Date().getFullYear();
  return (
    <section className="flex justify-center items-center w-full bg-[#141F49]">
      <div className="w-[80%] llg:w-[95%] flex justify-between llg:justify-center items-start llg:items-center flex-col pt-14">
        <main className="grid md:grid-cols-2 lmd:grid-cols-1 gap-6 w-full">
          <div className="flex justify-start items-start lmd:justify-center lmd:items-center flex-col">
            <Image
              src={footerLogo}
              alt="Always PDF White Logo"
              style={{ filter: "brightness(0) invert(1)" }}
              priority
            />
            <div className="flex justify-center items-center gap-4 mt-4">
              {socialLinks?.map((item: SocialLink, i: number) => (
                <a key={i} href={item?.link} target="_blank" rel="noopener noreferrer">
                  {item?.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-8 lmd:gap-4 lmd:flex-col uppercase lmd:hidden">
            {hashLinks?.map((item: HashLink, i: number) => (
              <p
                key={i}
                className="text-white font-Ubuntu text-lg llg:text-base mb-4"
              >
                {item?.name}
              </p>
            ))}
          </div>
          {/* <div>
            {[
              "About AlwaysPDF",
              "Privacy Policy",
              "Terms of Service",
              "Contact Us",
            ]?.map((item, i) => (
              <p key={i} className="text-white font-Ubuntu text-lg llg:text-base mb-4">
                {item}
              </p>
            ))}
          </div> */}
          {/* <div>
            <p className="text-white text-sm  font-Ubuntu">
              Copyright &copy; {year} alwayspdf.com. All rights reserved
            </p>
          </div> */}
        </main>
        <hr className="bg-white w-full my-14" />
        <main className="w-full">
          {/* <Image src={bigLogo} alt="Always PDF White Big Logo" priority /> */}
          {/* <div className="flex justify-center items-center w-full gap-10 lmd:gap-4 lmd:flex-col lmd:hidden">
            {[
              "About AlwaysPDF",
              "Privacy Policy",
              "Terms of Service",
              "Contact Us",
            ]?.map((item, i) => (
              <p key={i} className="text-white font-Ubuntu text-lg llg:text-base mb-4">
                {item}
              </p>
            ))}
          </div> */}
          <p className="text-center text-white mb-8 lsm:text-sm">
            Copyright © {year} alwayspdf.com. All rights reserved
          </p>
        </main>
      </div>
    </section>
  );
};

export default Footer;
