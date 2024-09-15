import React, { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const links = [
    { name: "Help and Support" },
    { name: "Privacy Policy" },
    { name: "Terms of Service" },
  ];

  return (
    <section className="flex justify-center items-center w-full bg-[#e2e2ff] ">
      <div className="flex justify-center items-center flex-col lg:w-[30%] lmd:w-[90%] py-[3rem]">
        <div className="flex justify-center items-center w-full">{children}</div>
        <div className="flex justify-center items-center w-full">
          <ul className="flex justify-between items-center w-full mt-7">
            {links?.map((item, i) => <li key={i} className="text-sm font-Ubuntu font-semibold text-basicBlue">{item.name}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AuthWrapper;
