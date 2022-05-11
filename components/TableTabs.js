import { PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "@/components/context/AppWrapper";
import CreateCollection from "@/components/forms/CreateCollection";

export default function TableTabs({ tabs = [] }) {
    const router = useRouter();
    const curPath = router.asPath.split("/");

    const { modal } = useAppContext();

    const addCollection = () => {
        modal.setModalContent(<CreateCollection />);
        modal.handleShow();
    };

    return (
        <>
            <ul
                className="flex h-fit w-9/12 overflow-x-scroll overscroll-contain pr-6 
            text-center text-sm font-medium text-gray-500 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-800 dark:text-gray-400"
            >
                {tabs.map((tab, idx) => (
                    <li className="mr-2" key={`${tab}_${idx}`}>
                        <Link href={`/admin/${tab}`} passHref>
                            <a
                                className={`group 
                                    inline-flex w-fit rounded-t-lg 
                                    bg-gray-100 
                                    p-4 pb-6 hover:bg-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700
                            ${
                                curPath.length == 2 && idx == 0
                                    ? "text-blue-700"
                                    : curPath[2] == tab
                                    ? "text-blue-700"
                                    : ""
                            }
                        `}
                            >
                                {tab}
                            </a>
                        </Link>
                    </li>
                ))}
                <li
                    className="mr-2 cursor-pointer"
                    onClick={() => addCollection()}
                >
                    <a
                        className="group 
                        inline-flex w-fit whitespace-nowrap rounded-t-lg
                         bg-gray-100 p-4 pb-6 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <PlusIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" />
                        Add Collection
                    </a>
                </li>
            </ul>
        </>
    );
}
