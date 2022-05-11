import {
    LightningBoltIcon,
    PencilIcon,
    PhotographIcon,
    TagIcon,
} from "@heroicons/react/outline";

export default function AddField({ forRef }) {
    return (
        <div>
            <h3 className="mb-3">Add Fields</h3>
            <div className="flex flex-row gap-6">
                <div className="inline-flex w-fit cursor-pointer  flex-row rounded bg-sky-700 p-2  text-gray-100 hover:drop-shadow-xl">
                    <PencilIcon className="mr-2 h-6 w-6" /> Text Box
                </div>
                <div className="inline-flex w-fit cursor-pointer  flex-row rounded bg-sky-700 p-2  text-gray-100 hover:drop-shadow-xl">
                    <PhotographIcon className="mr-2 h-6 w-6" /> Image
                </div>
                <div className="inline-flex w-fit cursor-pointer  flex-row rounded bg-sky-700 p-2  text-gray-100 hover:drop-shadow-xl">
                    <TagIcon className="mr-2 h-6 w-6" /> Tags
                </div>
                <div className="inline-flex w-fit cursor-pointer  flex-row rounded bg-sky-700 p-2  text-gray-100 hover:drop-shadow-xl">
                    <LightningBoltIcon className="mr-2 h-6 w-6" /> RichText
                </div>
            </div>
        </div>
    );
}
