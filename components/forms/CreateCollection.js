import { useState } from "react";
import Button from "@/components/Button";
import { useAppContext } from "@/components/context/AppWrapper";

export default function CreateCollection({}) {
    const [collectionName, setCollectionName] = useState("");
    const { modal, toast } = useAppContext();

    const postCollection = async () => {
        if (collectionName !== "") {
            try {
                let body = JSON.stringify({ name: collectionName });
                const response = await fetch(
                    "/api/pludo/fauna/create-collection",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body,
                    }
                );
                const data = await response.json();
                if (response.status === 200) {
                    toast.setMessage("Collection created successfully");
                    toast.setStatus(200);

                    modal.handleClose();
                } else {
                    toast.setMessage(data.message);
                    toast.setStatus(500);
                }
                toast.setToastShow(true);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
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
                onChange={(e) => setCollectionName(e.target.value)}
            />
            <Button
                onClick={() => postCollection()}
                text={"Submit"}
                style={"full"}
            />
        </div>
    );
}
