import { Construction } from "lucide-react";
import React from "react";

const UnderConstruction = () => {
  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <Construction className="text-primary mb-8 h-12 w-12" />
      <h2 className="text-center text-xl">This page is under</h2>
      <h1 className="text-primary mb-8 text-4xl">construction</h1>
      <p>Check back soon to see something cool!</p>
    </div>
  );
};

export default UnderConstruction;
