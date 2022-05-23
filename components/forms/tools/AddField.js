import {
    LightningBoltIcon,
    PencilIcon,
    PhotographIcon,
    TagIcon,
} from "@heroicons/react/outline";
import { useAppContext } from "@/components/context/AppWrapper";

export default function AddField({
    addFormField = () => null,
    addTags = () => null,
}) {
    const buttonClasses = `inline-flex w-fit cursor-pointer  flex-row rounded bg-sky-700 p-2  text-gray-100 hover:drop-shadow-xl`;
    const { modal, toast } = useAppContext();

    const handleClickOnCollection = async (collection) => {
        try {
            const response = await fetch(
                "/api/pludo/fauna/get-documents-by-collection",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        collection,
                    }),
                }
            );
            const data = await response.json();
            addTags(collection, data);
            modal.handleClose();
        } catch (error) {
            toast.setToastShow(true);
            toast.setMessage(error);
            toast.setStatus(data.status);
        }
    };

    const selectCollectionForTags = async () => {
        try {
            const response = await fetch("/api/pludo/fauna/get-collections", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            modal.setModalContent(
                <div className="flex w-96 flex-col gap-3 p-6">
                    <h2 className="">Select a collection</h2>
                    <p className="text-sm">
                        You can relate the current document to any document in
                        the collection you select
                    </p>
                    <div className=" flex flex-row flex-wrap gap-3">
                        {data.map((collection, index) => (
                            <div
                                key={index}
                                className="w-fit cursor-pointer rounded bg-sky-700 p-1 text-sm hover:bg-sky-600 hover:drop-shadow-xl"
                                onClick={() =>
                                    handleClickOnCollection(collection)
                                }
                            >
                                {collection}
                            </div>
                        ))}
                    </div>
                </div>
            );

            modal.handleShow();
        } catch (error) {
            toast.setToastShow(true);
            toast.setMessage(error);
            toast.setStatus(data.status);
        }
    };

    return (
        <div className="">
            <h3 className="mb-3">Add Fields</h3>
            <div className="flex flex-row gap-6">
                <div
                    className={buttonClasses}
                    onClick={() => addFormField("text")}
                >
                    <PencilIcon className="mr-2 h-6 w-6" /> Text Box
                </div>
                {/* <div
                    className={buttonClasses}
                    onClick={() => addFormField("image")}
                >
                    <PhotographIcon className="mr-2 h-6 w-6" /> Image
                </div> */}
                <div
                    className={buttonClasses}
                    onClick={selectCollectionForTags}
                >
                    <TagIcon className="mr-2 h-6 w-6" /> Tags
                </div>
                <div
                    className={buttonClasses}
                    onClick={() => addFormField("richtext")}
                >
                    <LightningBoltIcon className="mr-2 h-6 w-6" /> RichText
                </div>
            </div>
        </div>
    );
}
