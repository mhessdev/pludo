import AddField from "@/components/forms/tools/AddField";
import { useState } from "react";
import { RewindIcon } from "@heroicons/react/outline";
import { useCallback, useEffect } from "react";

export default function FormHead({
    title,
    highlight,
    description,
    history,
    addFormField = () => null,
    addTags = () => null,
    reloadHistory = () => null,
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
        console.log(historyPosition);
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
        <div className="mb-3 flex w-full flex-col gap-6 bg-cyan-900 p-6 text-gray-300 drop-shadow-md">
            <h2>
                {title}
                <span className="ml-3 rounded bg-green-600 p-2 capitalize text-gray-100">
                    {highlight}
                </span>
            </h2>
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
