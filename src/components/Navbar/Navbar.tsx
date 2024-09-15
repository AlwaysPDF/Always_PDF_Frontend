"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Image from "next/image";
import fullColorLogo from "../../../public/assets/fullColorLogo.png";
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
    <nav className="flex justify-center items-center w-full">
      <div className="bg-white drop-shadow-[0px_4px_60px_0px_#FFFFFF_inset] flex justify-between items-center w-[90%] py-2 px-4 mt-6 rounded-md">
        <aside className="w-[10%] llg:w-[40%] flex justify-center items-center">
          <Image
            src={fullColorLogo}
            alt="Ever PDF Logo"
            className="w-full"
            priority
          />
        </aside>
        <aside className="hidden md:flex justify-center items-center">
          <ul className="flex justify-center items-center flex-col md:flex-row">
            {links?.map((item, i) => (
              <li
                className="mr-4 last:mr-0 text-basicBlue text-[16px] font-Ubuntu font-semibold cursor-pointer"
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
            <i className="fa-solid fa-x text-basicBlue"></i>
          ) : (
            <i className="fa-solid fa-bars text-basicBlue"></i>
          )}
        </button>
        {/* Nav Buttons */}
        {/* Nav Buttons */}
      </div>
    </nav>
  );
};

export default Navbar;
