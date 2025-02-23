// "use client";
// import { useState } from "react";

// const Hamburger = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClick = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     // <button
//     //   onClick={handleClick}
//     //   className="flex flex-col items-center justify-center"
//     // >
//     //   <span
//     //     className={`block h-1 w-6 rounded-sm bg-black transition-all duration-300 ease-out ${
//     //       isOpen ? "translate-y-1 rotate-45" : "-translate-y-0.5"
//     //     }`}
//     //   ></span>
//     //   <span
//     //     className={`my-0.5 block h-1 w-6 rounded-sm bg-black transition-all duration-300 ease-out ${
//     //       isOpen ? "opacity-0" : "opacity-100"
//     //     }`}
//     //   ></span>
//     //   <span
//     //     className={`block h-1 w-6 rounded-sm bg-black transition-all duration-300 ease-out ${
//     //       isOpen ? "-translate-y-1 -rotate-45" : "translate-y-0.5"
//     //     }`}
//     //   ></span>
//     // </button>
//     <div>
//       <button onClick={handleClick} className="group relative">
//         <div className="relative flex h-[50px] w-[50px] transform items-center justify-center overflow-hidden rounded-full bg-slate-700 shadow-md ring-0 ring-gray-300 ring-opacity-30 transition-all duration-200 hover:ring-8 group-focus:ring-4">
//           <div className="flex h-[20px] w-[20px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300">
//             <div className="h-[2px] w-7 origin-left transform bg-white transition-all duration-300 group-focus:translate-x-10"></div>
//             <div className="h-[2px] w-7 transform rounded bg-white transition-all delay-75 duration-300 group-focus:translate-x-10"></div>
//             <div className="h-[2px] w-7 origin-left transform bg-white transition-all delay-150 duration-300 group-focus:translate-x-10"></div>

//             <div className="absolute top-2.5 flex w-0 -translate-x-10 transform items-center justify-between transition-all duration-500 group-focus:w-12 group-focus:translate-x-0">
//               <div className="absolute h-[2px] w-5 rotate-0 transform bg-white transition-all delay-300 duration-500 group-focus:rotate-45"></div>
//               <div className="absolute h-[2px] w-5 -rotate-0 transform bg-white transition-all delay-300 duration-500 group-focus:-rotate-45"></div>
//             </div>
//           </div>
//         </div>
//       </button>
//     </div>
//   );
// };

// export default Hamburger;
"use client";
import { useState } from "react";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button onClick={handleClick} className="group relative">
      <div className="bg-primary relative flex h-[50px] w-[50px] transform items-center justify-center overflow-hidden rounded-full transition-all duration-200">
        {/* ✅ Three horizontal bars */}
        <div
          className={`flex h-[20px] w-[20px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300 ${
            isOpen ? "translate-x-10 opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`h-[2px] w-7 origin-left transform bg-black transition-all duration-300 ${
              isOpen ? "translate-x-10 opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`h-[2px] w-7 transform rounded bg-black transition-all delay-75 duration-300 ${
              isOpen ? "translate-x-10 opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`h-[2px] w-7 origin-left transform bg-black transition-all delay-150 duration-300 ${
              isOpen ? "translate-x-10 opacity-0" : "opacity-100"
            }`}
          ></div>
        </div>

        {/* ✅ X (Close) Icon */}
        <div
          className={`absolute -right-3 top-6 flex w-12 -translate-x-10 transform items-center justify-between transition-all duration-500 ${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`absolute h-[2px] w-5 transform bg-black transition-all delay-300 duration-500 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          ></div>
          <div
            className={`absolute h-[2px] w-5 transform bg-black transition-all delay-300 duration-500 ${
              isOpen ? "-rotate-45" : "rotate-0"
            }`}
          ></div>
        </div>
      </div>
    </button>
  );
};

export default Hamburger;
