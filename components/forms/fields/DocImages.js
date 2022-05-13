import Image from "next/image";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { useAppContext } from "@/components/context/AppWrapper";
import MediaBrowser from "@/components/MediaBrowser";
import { IMAGE_CDN } from "@/lib/constants";

export default function DocImages({
    images,
    folderList,
    onSelectImage = () => null,
    onAltChange = () => null,
    onDelete = () => null,
    onMakeFeatured = () => null,
}) {
    const { modal } = useAppContext();
    const openMediaBrowser = () => {
        modal.setModalContent(
            <MediaBrowser
                folderList={folderList}
                expandImage={false}
                forEdit={true}
                onSelectImage={onSelectImage}
            />
        );
        modal.handleShow();
    };

    return (
        <div className="flex flex-col gap-2">
            {(images.gallery.length > 0 || images.featured?.src) && (
                <div className="block w-fit text-sm font-medium capitalize text-gray-900 dark:text-gray-300">
                    Images
                </div>
            )}
            <div
                className={`grid grid-cols-3 gap-6 rounded-md   p-3
                ${
                    images.gallery.length > 0 || images.featured?.src
                        ? "border-2 border-gray-300"
                        : ""
                }
            `}
            >
                {images.featured?.src && (
                    <div className="">
                        <div
                            className="group aspect-w-16 aspect-h-9 
                                    relative cursor-pointer rounded-lg border-gray-200 bg-white shadow-md 
                                    hover:bg-gray-100 dark:border-gray-700
                                    dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <Image
                                src={IMAGE_CDN + "/" + images.featured?.src}
                                alt={images.featured?.alt}
                                layout="fill"
                                className="group-hover:blur-sm"
                                sizes="50vw"
                                objectFit="contain"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                className="dark:shadow-sm-light mt-2 block w-full rounded-lg border border-gray-300 
                            bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 
                            focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                            dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                type="text"
                                placeholder="Alt Text - Used For SEO"
                                value={images.featured?.alt || ""}
                                onChange={(e) =>
                                    onAltChange("featured", e.target.value)
                                }
                            />
                            <div className="flex justify-between">
                                <div
                                    className="group flex w-fit justify-center  rounded-md bg-purple-500
                                        p-2 text-sm text-gray-100 "
                                >
                                    Featured
                                </div>
                                <div
                                    className="group flex w-fit cursor-pointer justify-center  rounded-md bg-red-500
                                        p-2 text-sm text-gray-100 hover:bg-red-400 hover:drop-shadow-xl"
                                    onClick={() => onDelete("featured")}
                                >
                                    Remove
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {images.gallery.map((image, index) => {
                    return (
                        <div className="" key={index}>
                            <div
                                className="group aspect-w-16 aspect-h-9 
                                            relative cursor-pointer rounded-lg border-gray-200 bg-white shadow-md 
                                            hover:bg-gray-100 dark:border-gray-700
                                            dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <Image
                                    src={IMAGE_CDN + "/" + image?.src}
                                    alt={image?.alt}
                                    layout="fill"
                                    className="group-hover:blur-sm"
                                    sizes="50vw"
                                    objectFit="contain"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <input
                                    className="dark:shadow-sm-light mt-2 block w-full rounded-lg border border-gray-300 
                                    bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 
                                    focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                                    dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    type="text"
                                    placeholder="Alt Text - Used For SEO"
                                    value={image?.alt || ""}
                                    onChange={(e) =>
                                        onAltChange(index, e.target.value)
                                    }
                                />
                                <div className="flex justify-between">
                                    <div
                                        className="group flex w-fit cursor-pointer justify-center rounded-md bg-sky-600
                                        p-2 text-sm text-gray-100 hover:bg-sky-500 hover:drop-shadow-xl"
                                        onClick={() => onMakeFeatured(index)}
                                    >
                                        Make Featured Image
                                    </div>
                                    <div
                                        className="group flex w-fit cursor-pointer justify-center  rounded-md bg-red-500
                                        p-2 text-sm text-gray-100 hover:bg-red-400 hover:drop-shadow-xl"
                                        onClick={() => onDelete(index)}
                                    >
                                        Remove
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div
                className="group flex cursor-pointer  items-stretch justify-center rounded-md
                        bg-sky-600 p-3 text-gray-100 hover:bg-sky-500 hover:drop-shadow-xl"
                onClick={() => openMediaBrowser()}
            >
                <PlusCircleIcon className="h-6 w-6 self-center" />
                <span className="ml-2 self-center text-sm">Add Image</span>
            </div>
        </div>
    );
}
