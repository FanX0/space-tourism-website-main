import iconHamburger from "../../../../public/assets/shared/icon-hamburger.svg";
import iconClose from "../../../../public/assets/shared/icon-close.svg";
import type { MouseEventHandler } from "react";

type MenuButtonProps = {
  ariaExpanded: boolean;
  ariaControls: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const MenuButton: React.FC<MenuButtonProps> = ({
  ariaExpanded,
  ariaControls,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      onClick={onClick}
      className={`${className} z-2 cursor-pointer md:hidden`}
    >
      <img src={ariaExpanded ? iconClose : iconHamburger} alt="menu" />
    </button>
  );
};

export default MenuButton;
