import Link from "next/link";
import MyImage from "@/components/MyImage";
export default function Logo() {
    return (
        <Link href="/">
            <a className="flex items-center space-x-1 text-blue-600 hover:drop-shadow-sm">
                {/* <DatabaseIcon className="w-8 h-8 flex-shrink-0" /> */}
                <span className="flext-shrink-0 relative h-6 w-6">
                    {/* <Image
						src="/pludo.svg"
						layout="fill"
						alt="Pludo"
						sizes="50vw"
					/> */}
                    <MyImage
                        src="https://pludo.thecycledb.com/pludo.svg"
                        alt="Pludo"
                        layout="fill"
                    />
                </span>
                <span className="whitespace-nowrap text-lg font-bold tracking-tight">
                    Pludo
                </span>
            </a>
        </Link>
    );
}
