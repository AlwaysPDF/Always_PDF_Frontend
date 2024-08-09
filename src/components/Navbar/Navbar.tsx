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
  return (
    <nav className="flex justify-center items-center w-full">
      <div className="bg-white drop-shadow-[0px_4px_60px_0px_#FFFFFF_inset] flex justify-between items-center w-[90%] py-2 px-4 mt-6 rounded-md">
        <aside className="w-[10%] flex justify-center items-center">
          <Image src={fullColorLogo} alt="Ever PDF Logo" className="w-full" />
        </aside>
        <aside>
          <ul className="flex justify-center items-center">
            {links?.map((item, i) => (
              <li className="mr-4 last:mr-0 text-basicBlue text-[16px] font-Ubuntu font-semibold cursor-pointer" key={i}>
                {item?.name}
              </li>
            ))}
          </ul>
        </aside>
        <aside>
          <Link
            href="/auth/signin"
            className="bg-[#EAF5FF] border border-basicBlue text-basicBlue px-4 mr-4 py-2 rounded-md"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signin"
            className="text-[#EAF5FF] bg-basicBlue px-4 py-2 rounded-md"
          >
            Create a free acount
          </Link>
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
