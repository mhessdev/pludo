import AddField from "@/components/forms/tools/AddField";
import { useState } from "react";
import { RewindIcon, TrashIcon } from "@heroicons/react/outline";
import { useCallback, useEffect } from "react";

export default function FormHead({
    collection,
    description,
    history,
    editForm = false,
    addFormField = () => null,
    addTags = () => null,
    reloadHistory = () => null,
    clearForm = () => null,
}) {
    const [historyPosition, setHistoryPosition] = useState(0);

    const handleUndo = useCallback(() => {
        setHistoryPosition(
            historyPosition === 0 ? history.length - 1 : historyPosition - 1
        );
        reloadHistory(
            history[
                historyPosition === 0 ? history.length - 1 : historyPosition - 1
            ]
        );
    }, [historyPosition, history, reloadHistory]);

    const handleKeyPress = useCallback(
        (event) => {
            if (event.ctrlKey === true) {
                if (event.key === "z") {
                    handleUndo();
                }
            }
        },
        [handleUndo]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <div className="mb-3 flex w-full flex-col gap-3 bg-cyan-900 py-3 px-6 text-gray-300 drop-shadow-md">
            <div className="flex flex-row justify-between text-sm capitalize text-gray-100">
                <span className="self-center rounded bg-green-600 px-2  ">
                    Collection: {collection}
                </span>
                <div
                    className="inline-flex cursor-pointer flex-row self-center rounded bg-red-500 px-2 hover:bg-red-400"
                    onClick={() => clearForm()}
                >
                    <TrashIcon className="mr-2 h-3 w-3 self-center" /> Clear
                    Form
                </div>
            </div>
            <p className="text-sm text-gray-300">{description}</p>
            <div className="sticky top-0 flex flex-row justify-between">
                <AddField addFormField={addFormField} addTags={addTags} />
                {history.length > 1 && (
                    <span
                        className="flex w-fit cursor-pointer flex-row gap-3 self-end rounded bg-sky-700 p-2  text-gray-100 hover:drop-shadow-xl"
                        onClick={() => handleUndo()}
                    >
                        <RewindIcon className="h-6 w-6" />
                        Undo
                    </span>
                )}
            </div>
        </div>
    );
}
