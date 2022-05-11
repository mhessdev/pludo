import { PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppContext } from "./context/AppWrapper";
import Button from "./Button";

export default function TableTabs({ tabs = [] }) {
    const router = useRouter();
    const curPath = router.pathname;
    const { modal } = useAppContext();
    const [newCollection, setNewCollection] = useState("");

    const addCollection = async () => {
        const createCollection = async () => {
            if (newCollection !== "") {
                try {
                    const response = await fetch(
                        "/api/fauna/create-collection",
                        {
                            method: "POST",
                            body: {
                                collection: newCollection,
                            },
                        }
                    );
                    const data = await response.json();
                } catch (err) {
                    console.log(err);
                }
            }
        };

        modal.setModalContent(
            <div className="m-auto h-fit w-96 p-10">
                <label
                    htmlFor="collection"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Collection Name
                </label>
                <input
                    type="text"
                    id="collection"
                    className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Ex. Items"
                    required
                    onChange={(e) => setNewCollection(e.target.value)}
                />
                <Button
                    onClick={() => createCollection()}
                    text={"Submit"}
                    style={"full"}
                />
            </div>
        );
        modal.handleShow();
    };

    return (
        <>
            <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {tabs.map((tab, idx) => (
                    <li className="mr-2" key={`${tab}_${idx}`}>
                        <Link href="#" passHref>
                            <a
                                className={`group 
                        inline-flex rounded-t-lg bg-gray-100 p-4 
                        hover:bg-gray-500 dark:bg-gray-800 
                        dark:hover:bg-gray-700
                            ${
                                curPath == "/admin" && idx == 0
                                    ? "text-blue-700"
                                    : curPath == "/" + tab
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
                        inline-flex rounded-t-lg bg-gray-100 p-4 
                         hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <PlusIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" />
                        Add Collection
                    </a>
                </li>
            </ul>
        </>
    );
}
