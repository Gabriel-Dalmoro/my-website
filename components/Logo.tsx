import Image from "next/image";

export default function Logo({ size = 40 }) {
  return (
    <Image
      src="/favicon.png" // Reusing the favicon as the main logo
      width={size}
      height={size}
      alt="Gabriel Dalmoro Logo"
      className="rounded-md"
    />
  );
}
