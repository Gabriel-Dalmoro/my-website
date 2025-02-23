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
          <a href="#contact" className="hidden text-base sm:block">
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
        <div className="bg-primary-faded border-primary absolute left-0 top-0 h-auto w-full rounded-md border-2 p-4 transition-all">
          <nav className="mt-8 flex flex-col items-center gap-8">
            {pathname === "/work" ? (
              <>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
                <a href="/adventures">Check Out My Adventures</a>
                <DarkButton />
              </>
            ) : (
              <>
                <a href="/blog">Blog</a>
                <a href="/photos">Photos</a>
                <a href="/map">Map</a>
                <a href="/work">Explore My Work</a>
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
