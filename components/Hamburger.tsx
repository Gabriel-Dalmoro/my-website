"use client";
interface HamburgerProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Hamburger = ({ isMenuOpen, toggleMenu }: HamburgerProps) => {
  return (
    <button
      id="hamburger-button"
      onClick={toggleMenu}
      className="group relative"
    >
      <div className="relative flex h-[50px] w-[50px] transform items-center justify-center overflow-hidden rounded-full bg-primary transition-all duration-200">
        {/* ✅ Three horizontal bars */}
        <div
          className={`flex h-[20px] w-[20px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "translate-x-10 opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`h-[2px] w-7 origin-left transform bg-black transition-all duration-300 ${
              isMenuOpen ? "translate-x-10 opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`h-[2px] w-7 transform rounded bg-black transition-all delay-75 duration-300 ${
              isMenuOpen ? "translate-x-10 opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`h-[2px] w-7 origin-left transform bg-black transition-all delay-150 duration-300 ${
              isMenuOpen ? "translate-x-10 opacity-0" : "opacity-100"
            }`}
          ></div>
        </div>

        {/* ✅ X (Close) Icon */}
        <div
          className={`absolute -right-3 top-6 flex w-12 -translate-x-10 transform items-center justify-between transition-all duration-500 ${
            isMenuOpen ? "translate-x-0 opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`absolute h-[2px] w-5 transform bg-black transition-all delay-300 duration-500 ${
              isMenuOpen ? "rotate-45" : "rotate-0"
            }`}
          ></div>
          <div
            className={`absolute h-[2px] w-5 transform bg-black transition-all delay-300 duration-500 ${
              isMenuOpen ? "-rotate-45" : "rotate-0"
            }`}
          ></div>
        </div>
      </div>
    </button>
  );
};

export default Hamburger;
