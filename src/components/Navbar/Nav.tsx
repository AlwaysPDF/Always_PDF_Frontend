"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Image from "next/image";
import Link from "next/link";
import logoLand from "../../../public/assets/logoLand.svg";
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
    <section className="flex justify-center items-center w-full">
      <div className="flex justify-between items-center w-[90%]">
        <aside>
          <Image src={logoLand} alt="Always PDF" />
        </aside>
        <aside className="glassmorphism-navbar">
          <ul className="flex justify-center items-center flex-col md:flex-row">
            {links?.map((item, i) => (
              <li
                className="mr-4 last:mr-0 text-white text-[16px] font-Ubuntu font-semibold cursor-pointer"
                key={i}
              >
                <Link href={item?.point}>{item?.name}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <aside>
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
            <aside className="hidden md:flex justify-center items-center gap-4">
              <Link
                href="/auth/email"
                className="text-[#EAF5FF] bg-basicBlue px-4 py-2 rounded-full"
              >
                Create a free acount
              </Link>
              <Link
                href="/auth/signin"
                className="bg-[#EAF5FF] border text-black px-4 py-2 rounded-full"
              >
                Sign In
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
        </aside>
      </div>
    </section>
  );
};

export default Navbar;