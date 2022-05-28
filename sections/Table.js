import TableTabs from "@/components/TableTabs";
import Pagination from "@/components/Pagination";
import CreateDocument from "@/components/forms/CreateDocument";
import EditDocument from "@/components/forms/EditDocument";
import { useAppContext } from "@/components/context/AppWrapper";
import Image from "next/image";
import { IMAGE_CDN } from "@/lib/constants";
import Button from "@/components/Button";
import MediaBrowser from "@/components/MediaBrowser";
import { checkCookies } from "cookies-next";
import { Switch, JsonInput } from "@mantine/core";
import { PencilAltIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import NProgress from "nprogress";

export default function Table({
    tabs,
    rows,
    folderList,
    collection,
    after = [],
}) {
    const { modal, slideOut, toast } = useAppContext();

    const [docs, setDocs] = useState(rows);

    const [nextDoc, setNextDoc] = useState(after);

    useEffect(() => {
        setDocs(rows);
        setNextDoc(after);
    }, [rows, after]);

    const loadMore = async () => {
        try {
            NProgress.start();
            const response = await fetch(
                `/api/pludo/fauna/functions/get-rows`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        collection: collection,
                        after: nextDoc,
                    }),
                }
            );

            const data = await response.json();
            if (data?.after) {
                data.after.pop();
                setNextDoc(data.after);
            } else {
                setNextDoc([]);
            }

            setDocs([...docs, ...data.data]);
            NProgress.done();
        } catch (err) {
            console.log(err);
            toast.setMessage("Error Loading More Documents");
            toast.setToastShow(true);
            toast.setStatus(500);
            NProgress.done();
        }
    };

    const getDocData = async (id) => {
        try {
            const response = await fetch(
                "/api/pludo/fauna/get-document-by-id",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        collection: collection,
                        id: id,
                    }),
                }
            );
            const data = await response.json();

            return data?.data;
        } catch (error) {
            console.error(err);
            toast.setMessage("Error Retrieving Document");
            toast.setToastShow(true);
            toast.setStatus(500);
            return {};
        }
    };

    const editDocumentClick = async (id) => {
        const data = await getDocData(id);
        if (data) {
            slideOut.setSlideContent(
                <EditDocument
                    collection={collection}
                    folderList={folderList}
                    docData={data}
                    docId={id}
                />
            );
            slideOut.handleSlideShow();
        }
    };

    const jsonClick = async (id) => {
        const data = await getDocData(id);
        if (data) {
            modal.setModalContent(
                <div className="grid h-fit w-[600px] gap-3 p-6">
                    <p className="w-full rounded-xl bg-red-400/50 p-2 text-center text-sm text-gray-100">
                        Please Only Submit Changes If You Know What Youre Doing
                    </p>
                    <p className="text-sm">
                        click in box then{" "}
                        <span className="rounded-md bg-green-600 p-1">
                            here
                        </span>{" "}
                        to format json
                    </p>
                    <JsonInput
                        defaultValue={JSON.stringify(data)}
                        label="Document Object"
                        radius="md"
                        validationError="Invalid json"
                        formatOnBlur
                        autosize
                        minRows={8}
                        maxRows={20}
                        classNames={{
                            label: "text-gray-900 dark:text-gray-100",
                        }}
                    />
                    <div className="w-full cursor-pointer rounded-md bg-green-500 p-6 text-center text-xl hover:bg-green-500 hover:drop-shadow-xl">
                        UPDATE DOCUMENT
                    </div>
                </div>
            );
            modal.handleShow();
        }
    };

    const imageClick = (path, imageName) => {
        let image = IMAGE_CDN + path + ".png";
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

    const replaceImage = (id) => {
        const selectImage = async (file) => {
            //console.log(file.split("Images")[1].split(".png")[0]);
            let newFile = file.replace("Images", "").replace(".png", "");
            try {
                const response = await fetch(
                    `/api/pludo/fauna/update-document`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            collection: collection,
                            id: id,
                            data: {
                                pludo: {
                                    images: {
                                        featured: {
                                            src: newFile,
                                        },
                                    },
                                },
                            },
                        }),
                    }
                );

                const data = await response.json();
                toast.setMessage("Image Updated");
                setDocs((prevState) =>
                    prevState.map((doc) => {
                        if (doc.id === id) {
                            doc.pludoFeatured = newFile;
                        }
                        return doc;
                    })
                );
                modal.handleClose();
            } catch (error) {
                console.log(error);
                toast.setMessage("Error Updating Document");
                toast.setStatus(500);
            }
            toast.setSide("left");
            toast.setToastShow(true);
        };

        modal.setModalContent(
            <MediaBrowser
                folderList={folderList}
                forEdit={true}
                onSelectImage={selectImage}
            />
        );
        modal.handleShow();
    };

    const createDocument = () => {
        slideOut.setSlideContent(
            <CreateDocument collection={collection} folderList={folderList} />
        );
        slideOut.handleSlideShow();
        if (checkCookies("create-doc")) {
            toast.setMessage(
                "Re-Loaded Previous Form Data, Submit Form or Clear Form to Start Over"
            );
            toast.setToastShow(true);
            toast.setStatus(200);
            toast.setSide("left");
        }
    };

    const handlePublish = async (id, bool) => {
        try {
            const response = await fetch("/api/pludo/fauna/update-document", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    collection: collection,
                    id: id,
                    data: {
                        pludo: {
                            published: bool,
                        },
                    },
                }),
            });

            const data = await response.json();
            console.log(data);
            toast.setMessage(
                `Document ${data.data.slug} ${
                    bool ? "Published" : "Unpublished"
                }`
            );
            toast.setStatus(200);

            setDocs((prevState) => {
                return prevState.map((doc) => {
                    if (doc.id === id) {
                        doc.published = bool;
                    }
                    return doc;
                });
            });
        } catch (err) {
            console.error(err);
            toast.setMessage("Error Updating Document");
            toast.setStatus(500);
        }
        toast.setToastShow(true);
        toast.setSide("left");
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
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Slug
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Featured Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Published
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Updated
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
                            {docs?.map((doc) => (
                                <tr
                                    key={doc.id}
                                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                        {doc.title}
                                    </th>
                                    <td className="px-6 py-4">{doc.slug}</td>
                                    <td className="px-6 py-4">
                                        {((doc.pludoFeatured ??
                                            doc.gameFeatured) && (
                                            <div className="flex h-fit flex-row justify-between">
                                                <div
                                                    className="group cursor-pointer"
                                                    onClick={() =>
                                                        imageClick(
                                                            doc.pludoFeatured ??
                                                                doc.gameFeatured,
                                                            doc.title
                                                        )
                                                    }
                                                >
                                                    <div className="relative mb-2 h-12 w-28">
                                                        <Image
                                                            layout="fill"
                                                            objectFit="contain"
                                                            sizes="50vw"
                                                            src={
                                                                IMAGE_CDN +
                                                                (doc.pludoFeatured ??
                                                                    doc.gameFeatured) +
                                                                ".png"
                                                            }
                                                            quality={50}
                                                            alt={doc.title}
                                                            className="group-hover:opacity-75"
                                                        />
                                                    </div>
                                                    <div className=" w-fit cursor-pointer  bg-gray-100 px-2 py-1 text-[.5em] group-hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600">
                                                        {doc.pludoFeatured ??
                                                            doc.gameFeatured}
                                                    </div>
                                                </div>
                                                <PencilAltIcon
                                                    onClick={() =>
                                                        replaceImage(doc.id)
                                                    }
                                                    className="ml-1 h-8 w-8 cursor-pointer place-self-end self-center hover:text-slate-600  dark:hover:text-gray-50"
                                                />
                                            </div>
                                        )) || (
                                            <Button
                                                text="Add Image"
                                                style="small"
                                                onClick={() =>
                                                    replaceImage(doc.id)
                                                }
                                            />
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <Switch
                                            onLabel="Published"
                                            offLabel="Draft"
                                            checked={doc.published}
                                            size="xl"
                                            onChange={(e) =>
                                                handlePublish(
                                                    doc.id,
                                                    e.currentTarget.checked
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(
                                            doc.updatedAt
                                        ).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            className="mr-2 mb-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-gray-300 hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-600 dark:focus:ring-gray-700 dark:hover:bg-gray-700"
                                            onClick={() => jsonClick(doc.id)}
                                        >
                                            JSON
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() =>
                                                editDocumentClick(doc.id)
                                            }
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
                {after.length > 0 && (
                    <div
                        onClick={() => loadMore()}
                        className="mt-10 w-full cursor-pointer rounded-xl bg-sky-500 p-6 text-center hover:drop-shadow-lg"
                    >
                        Load More
                    </div>
                )}
            </section>
        </>
    );
}
