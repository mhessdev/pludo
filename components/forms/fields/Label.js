import { CursorClickIcon, PencilAltIcon } from "@heroicons/react/outline";
import slugify from "slugify";
import { useState } from "react";
export default function Label({
    name,
    label,
    required = false,
    hidden = false,
    index,
    editName = false,
    onNameChange = () => null,
}) {
    const [newName, setNewName] = useState(name);
    return (
        <>
            {!hidden && name && (
                <label
                    htmlFor={name}
                    className="mb-2 block w-fit text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
                >
                    {editName ? (
                        <span
                            className="group flex cursor-pointer flex-row gap-3 hover:rounded-xl hover:bg-purple-300 hover:px-2 dark:hover:bg-purple-600 hover:dark:text-gray-100"
                            onClick={() => {
                                setNewName(name);
                                onNameChange(index, "");
                            }}
                        >
                            <PencilAltIcon className="hidden h-4 w-4 self-center group-hover:inline-flex" />
                            {label.replace(/_/g, " ")}
                            {required && (
                                <span className="text-red-500">*</span>
                            )}
                        </span>
                    ) : (
                        <>
                            {label.replace(/_/g, " ")}
                            {required && (
                                <span className="text-red-500">*</span>
                            )}
                        </>
                    )}
                </label>
            )}

            {!hidden && !name && (
                <div className="mb-2 flex h-10 gap-3">
                    <input
                        className=" inline-flex border-0 bg-gray-100 text-sm font-medium text-gray-900 dark:bg-slate-700 dark:text-gray-300"
                        type="text"
                        name={"ENTER_FIELD_NAME"}
                        value={newName}
                        placeholder={"ENTER_FIELD_NAME"}
                        onChange={(e) => setNewName(e.target.value)}
                        required
                    />
                    {newName.length > 3 && (
                        <span
                            className="inline-flex h-full w-fit cursor-pointer items-center self-center rounded-md border-0 bg-green-600 p-3 text-gray-50 hover:bg-green-500 hover:drop-shadow-xl"
                            onClick={() =>
                                onNameChange(
                                    index,
                                    slugify(newName, {
                                        replacement: "_",
                                        lower: true,
                                        strict: true,
                                    })
                                )
                            }
                        >
                            <CursorClickIcon className="mr-3 h-6 w-6" /> Submit
                            Field Name
                        </span>
                    )}
                </div>
            )}
        </>
    );
}
