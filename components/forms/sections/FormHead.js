import AddField from "@/components/forms/tools/AddField";

export default function FormHead({ title, highlight, description }) {
    return (
        <div className="mb-3 flex w-full flex-col gap-6 bg-cyan-900 p-6 drop-shadow-md">
            <h2>
                {title}
                <span className="ml-3 rounded bg-green-600 p-2 capitalize text-gray-100">
                    {highlight}
                </span>
            </h2>
            <p className="text-sm text-gray-300">{description}</p>
            <AddField />
        </div>
    );
}
