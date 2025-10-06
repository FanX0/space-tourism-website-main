import { NavLink } from "react-router";
import type { ReactNode } from "react";

type DisplayButtonProps = {
  to: string;
  children: ReactNode;
};

const DisplayButton: React.FC<DisplayButtonProps> = ({ to, children }) => {
  return (
    <button className="flex justify-center items-center bg-white rounded-full w-[144px] h-[144px] text-black font-bellefair hover:outline-[88px] hover:outline-white/10 md:w-[17rem] md:h-[17rem] lg:w-[17rem] lg:h-[17rem] md:text-[2rem]">
      <NavLink to={to}>{children}</NavLink>
    </button>
  );
};

export default DisplayButton;
//
