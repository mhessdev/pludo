import Link from "next/link";
import { DatabaseIcon } from "@heroicons/react/outline";
export default function Logo() {
  return (
    <Link href="/">
      <a className="flex items-center space-x-1 text-blue-600 hover:drop-shadow-sm">
        <DatabaseIcon className="w-8 h-8 flex-shrink-0" />
        <span className="font-bold text-lg tracking-tight whitespace-nowrap">
          Pludoh
        </span>
      </a>
    </Link>
  );
}
