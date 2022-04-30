import Link from "next/link";
import Image from "next/image";
export default function Logo() {
  return (
    <Link href="/">
      <a className="flex items-center space-x-1 text-blue-600 hover:drop-shadow-sm">
        {/* <DatabaseIcon className="w-8 h-8 flex-shrink-0" /> */}
        <span className="w-6 h-6 flext-shrink-0 relative">
          <Image src="/pludo.svg" layout="fill" alt="Pludo" />
        </span>
        <span className="font-bold text-lg tracking-tight whitespace-nowrap">
          Pludo
        </span>
      </a>
    </Link>
  );
}
