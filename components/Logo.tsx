import Image from "next/image";
import Link from "next/link";

export default function Logo({ size = 40 }) {
  return (
    <Link href="/">
      <Image
        src="/favicon.png" // Reusing the favicon as the main logo
        width={size}
        height={size}
        alt="Gabriel Dalmoro Logo"
        className="rounded-md"
      />
    </Link>
  );
}
