import { BackspaceIcon } from "@heroicons/react/outline";

export default function DeleteField({ onDelete = () => null, index }) {
    return (
        <BackspaceIcon
            className="inline-flex h-full w-10 cursor-pointer self-center rounded-md p-1 text-red-500 hover:bg-red-500 hover:text-gray-100 hover:drop-shadow-xl"
            onClick={() => onDelete(index)}
        />
    );
}
