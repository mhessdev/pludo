import Link from "next/link";
export default function Nav({ links }) {
  return (
    <nav className="grid gap-y-8">
      {links.map(({ text, href, icon: Icon }) => (
        <Link key={text} href={href}>
          <a
            className="-m-3 p-3 flex items-center space-x-2 rounded-md
              hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <Icon className="flex-shrink-0 h-7 w-7 text-blue-600" />
            <span className="font-medium capitalize">{text}</span>
          </a>
        </Link>
      ))}
    </nav>
  );
}
