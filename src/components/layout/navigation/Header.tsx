import { useId, useState } from "react";
import MenuButton from "../../ui/navigation/MenuButton";
import Navbar from "./Navbar";
import logo from "../../../../public/assets/shared/logo.svg";

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const handleToggle = () => {
    setOpen((o) => !o);
  };

  return (
    <header className="absolute flex flex-row justify-between  items-center  w-full h-[5.5rem] lg:h-[8.5rem] ">
      <div className="z-2 w-[2.5rem] h-auto bg-white rounded-full  ms-[1.5rem]  md:ms-[2.5rem] md:me-[2.5rem] ">
        <img src={logo} alt="logo" />
      </div>
      <div className="z-3 hidden lg:block absolute  bg-white ms-30 w-[43%] h-[.0625rem]"></div>
      <MenuButton
        ariaExpanded={open}
        ariaControls={menuId}
        onClick={handleToggle}
        className="me-[1.5rem]"
      />
      <Navbar id={menuId} open={open} />
    </header>
  );
};
export default Header;
