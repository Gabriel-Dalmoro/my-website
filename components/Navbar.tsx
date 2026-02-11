"use client";

import { usePathname } from "next/navigation";
import DarkButton from "./DarkButton";
import Hamburger from "./Hamburger";
import Logo from "./Logo";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById("mobile-menu");
      const hamburgerButton = document.getElementById("hamburger-button");

      // ✅ Close menu if click is outside of the menu and NOT on the Hamburger button
      if (
        isMenuOpen &&
        !mobileMenu?.contains(event.target as Node) &&
        !hamburgerButton?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="container mx-auto flex max-w-[1000px] items-center justify-between p-4 text-center">
      <Logo size={50} />

      {pathname === "/work" ? (
        <>
          <a href="#projects" className="hidden text-base sm:block">
            Projects
          </a>
          <a href="#contact" className="hidden text-base sm:block">
            Contact
          </a>
          <a href="/adventures" className="hidden text-base sm:block">
            Check Out My Adventures
          </a>
          <div className="hidden sm:block">
            <DarkButton />
          </div>
        </>
      ) : (
        <>
          <a href="/adventures/blog" className="hidden text-base sm:block">
            Blog
          </a>
          <a href="/adventures/photos" className="hidden text-base sm:block">
            Photos
          </a>
          <a href="#map" className="hidden text-base sm:block">
            Map
          </a>
          <a href="/work" className="hidden text-base sm:block">
            Explore My Work
          </a>
          <div className="hidden sm:block">
            <DarkButton />
          </div>
        </>
      )}

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="bg-zinc-950 border-white/10 absolute left-0 top-0 h-auto w-full rounded-md border-2 p-4 transition-all z-50 shadow-2xl"
        >
          <nav className="mt-8 flex flex-col items-center gap-8">
            {pathname === "/work" ? (
              <>
                <a onClick={() => setIsMenuOpen(false)} href="#projects">
                  Projects
                </a>
                <a onClick={() => setIsMenuOpen(false)} href="#contact">
                  Contact
                </a>
                <a onClick={() => setIsMenuOpen(false)} href="/adventures">
                  Check Out My Adventures
                </a>
                <DarkButton />
              </>
            ) : (
              <>
                <a onClick={() => setIsMenuOpen(false)} href="/adventures/blog">
                  Blog
                </a>
                <a
                  onClick={() => setIsMenuOpen(false)}
                  href="/adventures/photos"
                >
                  Photos
                </a>
                <a onClick={() => setIsMenuOpen(false)} href="/adventures/map">
                  Map
                </a>
                <a onClick={() => setIsMenuOpen(false)} href="/work">
                  Explore My Work
                </a>
                <DarkButton />
              </>
            )}
          </nav>
        </div>
      )}
      <div className="sm:hidden">
        <Hamburger isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </header>
  );
};

export default Navbar;
