import TableTabs from "@/components/TableTabs";
import Pagination from "@/components/Pagination";
import CreateDocument from "@/components/forms/CreateDocument";
import { useAppContext } from "@/components/context/AppWrapper";
import Image from "next/image";
import { IMAGE_CDN } from "@/lib/constants";
import Button from "@/components/Button";
import { PencilAltIcon } from "@heroicons/react/outline";
import MediaBrowser from "@/components/MediaBrowser";

export default function Table({ tabs, rows, folderList, collection }) {
    const { modal, slideOut } = useAppContext();
    const jsonClick = (row) => {
        modal.setModalContent(row);
        modal.handleShow();
    };

    const imageClick = (path, imageName) => {
        let image = IMAGE_CDN + "images" + path + ".webp";
        modal.setModalContent(
            <>
                <div className="aspect-w-16 aspect-h-9  relative mx-auto">
                    <Image
                        src={image}
                        alt={imageName}
                        layout="fill"
                        objectFit="contain"
                        sizes="50vw"
                    />
                </div>
                {image}
            </>
        );

        modal.handleShow();
    };

    const replaceImage = () => {
        const replaceFunction = async (file) => {
            // UPDATE FAUNA DOC WITH FILE
            modal.handleClose();
        };

        modal.setModalContent(
            <MediaBrowser
                folderList={folderList}
                forEdit={true}
                replaceFunction={replaceFunction}
            />
        );
        modal.handleShow();
    };

    const createDocument = () => {
        slideOut.setSlideContent(<CreateDocument collection={collection} />);
        slideOut.handleSlideShow();
    };

    return (
        <>
            <section className="mt-6">
                <div className="flex items-center justify-between">
                    <TableTabs tabs={tabs} />
                    {/* <Pagination /> */}
                    <Button
                        onClick={() => createDocument()}
                        style="large"
                        text={"Create Document"}
                    />
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-b-lg">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Key
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image File
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Published
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Json</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows?.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                        {row.name}
                                    </th>
                                    <td className="px-6 py-4">{row.key}</td>
                                    <td className="px-6 py-4">
                                        {(row.imageFile && (
                                            <div className="flex h-fit flex-row justify-between">
                                                <div
                                                    className="group cursor-pointer"
                                                    onClick={() =>
                                                        imageClick(
                                                            row.imagePath,
                                                            row.imageFile
                                                        )
                                                    }
                                                >
                                                    <div className="aspect-w-5 aspect-h-1 relative mb-2">
                                                        <Image
                                                            layout="fill"
                                                            objectFit="contain"
                                                            sizes="50vw"
                                                            src={
                                                                IMAGE_CDN +
                                                                "images" +
                                                                row.imagePath +
                                                                ".webp"
                                                            }
                                                            quality={50}
                                                            alt={row.imageFile}
                                                            className="group-hover:opacity-75"
                                                        />
                                                    </div>
                                                    <div className=" w-fit cursor-pointer rounded-full bg-gray-100 px-2 py-1 text-xs group-hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600">
                                                        {row.imageFile}
                                                    </div>
                                                </div>
                                                <PencilAltIcon
                                                    onClick={() =>
                                                        replaceImage()
                                                    }
                                                    className="ml-1 h-8 w-8 cursor-pointer place-self-end self-center hover:text-slate-600  dark:hover:text-gray-50"
                                                />
                                            </div>
                                        )) || (
                                            <Button
                                                text="Add Image"
                                                style="small"
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4">{row.id}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-center space-x-3">
                                            <label className="group relative flex items-center justify-between p-2">
                                                {row.published
                                                    ? "Published"
                                                    : "Unplublished"}
                                                <input
                                                    type="checkbox"
                                                    className="peer absolute left-1/2 h-full w-full -translate-x-1/2 appearance-none rounded-md"
                                                />
                                                <span
                                                    className="ml-4 flex h-4 w-12 flex-shrink-0 items-center 
                        rounded-full bg-gray-300 p-1 duration-300 
                        ease-in-out after:h-6 
                        after:w-6 after:rounded-full after:bg-white 
                        after:shadow-md after:duration-300 
                        group-hover:after:translate-x-1 peer-checked:bg-green-400
                         peer-checked:after:translate-x-6"
                                                ></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            className="mr-2 mb-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-gray-300 hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-600 dark:focus:ring-gray-700 dark:hover:bg-gray-700"
                                            onClick={() => jsonClick(row)}
                                        >
                                            JSON
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 dark:bg-blue-600 dark:focus:ring-blue-800 dark:hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}
