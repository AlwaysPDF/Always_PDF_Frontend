"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Image from "next/image";
import fullColorLogo from "../../../public/assets/coloredLogo.svg";
import Link from "next/link";

const Navbar = () => {
  const links = [
    { name: "Home", point: "#home" },
    { name: "Features", point: "#features" },
    { name: "How it works", point: "#how-it-works" },
    { name: "Pricing", point: "#pricing" },
  ];

  const [nav, setNav] = useState(false);
  const [token, setToken] = useState<string | null>(null); // Default to null

  const handleClick = () => {
    setNav(!nav);
  };
  const handleClose = () => {
    setNav(!nav);
  };

  // Fetch the token only on the client side
  useEffect(() => {
    const userToken = Cookies.get("UserToken");
    setToken?.(userToken || null); // Set token once available on client
  }, []);

  return (
    <nav className="flex justify-center items-center w-full lmd:fixed lmd:top-0 lmd:bg-[#021221] z-[9999999]">
      <div className="drop-shadow-[0px_4px_60px_0px_#FFFFFF_inset] flex justify-between items-center w-[90%] py-4 px-4 rounded-md ">
        <aside className="w-[12%] llg:w-[40%] flex justify-center items-center">
          <Link href="/">
            <Image
              src={fullColorLogo}
              alt="Always PDF White Logo"
              style={{ filter: "brightness(0) invert(1)" }}
              className="w-full"
              priority
            />
          </Link>
        </aside>
        <aside className="hidden lg:flex justify-center items-center">
          <ul className="flex justify-center items-center flex-col md:flex-row gap-14">
            {links?.map((item, i) => (
              <li
                className=" last:mr-0 text-white text-[16px] font-Ubuntu font-semibold cursor-pointer"
                key={i}
              >
                <Link href={item?.point}>{item?.name}</Link>
              </li>
            ))}
          </ul>
        </aside>
        {token !== null ? (
          <>
            <Link
              href="/dashboard/my-documents"
              className="text-[#EAF5FF] bg-basicBlue px-6 py-2 rounded-md hidden md:block"
            >
              My Documents
            </Link>
          </>
        ) : (
          <aside className="hidden md:flex justify-center items-center">
            <Link
              href="/auth/signin"
              className="bg-[#EAF5FF] border border-basicBlue text-basicBlue px-4 mr-4 py-2 rounded-md"
            >
              Sign In
            </Link>
            <Link
              href="/auth/email"
              className="text-[#EAF5FF] bg-basicBlue px-4 py-2 rounded-md"
            >
              Create a free acount
            </Link>
          </aside>
        )}

        {/* Nav Buttons */}
        {/* Nav Buttons */}

        <button className="md:hidden cursor-pointer " onClick={handleClick}>
          {nav ? (
            <i className="fa-solid fa-x text-white"></i>
          ) : (
            <i className="fa-solid fa-bars text-white"></i>
          )}
        </button>
        {/* Nav Buttons */}
        {/* Nav Buttons */}
      </div>

      {/* Mobile Navbar Overlay */}
      {nav && (
        <div className="fixed top-14 pt-2 left-0 w-full h-screen bg-[#021221] bg-opacity-90 flex flex-col justify-start items-center transition-all duration-300 ease-in-out text-center">
          <ul className="flex flex-col items-center gap-6 ">
            {links.map((item, i) => (
              <li key={i} className="text-white text-xl">
                {/* <Link
                  // to={item.linkTo}
                  onClick={() => setNav(false)} // Close menu on link click
                >
                  {item.name}
                </Link> */}
                <Link href={item?.point} onClick={() => setNav(false)}>
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            {token !== null ? (
              <>
                <Link
                  href="/dashboard/my-documents"
                  className="text-[#EAF5FF] bg-basicBlue px-6 py-2 rounded-md block"
                >
                  My Documents
                </Link>
              </>
            ) : (
              <aside className="flex justify-center items-center flex-col gap-6">
                <Link
                  href="/auth/signin"
                  className="bg-[#EAF5FF] border border-basicBlue text-basicBlue px-4 mr-4 py-2 rounded-md"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/email"
                  className="text-[#EAF5FF] bg-basicBlue px-4 py-2 rounded-md"
                >
                  Create a free acount
                </Link>
              </aside>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
