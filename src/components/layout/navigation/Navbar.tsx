import { NavLink } from "react-router";

type NavbarProps = {
  id: string;
  open: boolean;
};

type NavItem = {
  to: string;
  label: string;
  idx: string;
};

const links: readonly NavItem[] = [
  { to: "/", label: "Home", idx: "00" },
  { to: "/destination", label: "Destination", idx: "01" },
  { to: "/crew", label: "Crew", idx: "02" },
  { to: "/technology", label: "Technology", idx: "03" },
];

const Navbar: React.FC<NavbarProps> = ({ id, open }) => {
  return (
    <nav
      id={id}
      aria-hidden={!open}
      className={`${
        open ? "block" : "hidden"
      } z-1 md:block absolute right-0 top-0 min-h-screen md:min-h-fit w-[254px] md:static md:w-full  bg-white/5 backdrop-blur-2xl mt-0 md:mt-0  lg:h-[6rem] lg:w-[46rem]`}
    >
      <ul className="flex flex-col text-[1rem] md:text  md:flex-row gap-8 pt-[3rem] pl-[3rem] font-barlow-condensed tracking-[0.125rem] uppercase mt-[5.5rem] md:gap-[3rem] md:mt-0 md:pt-0 md:h-[6rem] md:items-center md:justify-end md:me-[2.5rem]">
        {links.map(({ to, label, idx }) => (
          <li key={to} className="relative">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex gap-3 text-white 
                 ${isActive ? "border-r-3 md:border-r-0 md:border-b-3" : ""}`
              }
            >
              <span className="font-bold">{idx}</span> {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
