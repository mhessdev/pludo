import DeleteField from "@/components/forms/tools/DeleteField";
import { MultiSelect } from "@mantine/core";

export default function Tags({
    collection,
    curTags,
    options,
    deletable = false,
    onChange = () => null,
    onDelete = () => null,
}) {
    const selectData = options.map((option) => {
        return {
            label: option.data?.title ? option.data?.title : option.id,
            value: option.id,
            title: option.data?.title,
            name: option.data?.title ? option.data?.title : option.id,
        };
    });

    return (
        <div key={`${collection}`} className="flex flex-row gap-3">
            <MultiSelect
                data={selectData}
                label={`Tagged By ${collection}`}
                placeholder="Pick all that you like"
                searchable
                nothingFound="Nothing found"
                value={curTags}
                onChange={(e) => onChange(collection, e)}
                classNames={{
                    wrapper: "dark:text-gray-100 text-gray-900",
                    dropdown:
                        "bg-gray-50 dark:text-gray-100 text-gray-900 dark:bg-slate-600",
                    item: "bg-gray-50 dark:text-gray-100 text-gray-900 dark:bg-slate-600",
                    hovered:
                        "hover:bg-gray-100 dark:text-gray-100 text-gray-900 dark:hover:bg-slate-700",
                    disabled:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    nothingFound:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    values: "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    value: "bg-sky-600 dark:text-gray-100 text-gray-100 dark:bg-sky-600 ",
                    searchInput:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    defaultValue:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    defaultValueRemove: "bg-red-500 text-gray-100",
                    separator:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    separatorLabel:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    defaultVariant:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    filledVariant:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    unstyledVariant:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    invalid:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    icon: "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    withIcon:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    input: "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    root: " dark:text-gray-100 text-gray-900 ",
                    label: " dark:text-gray-100 text-gray-900",
                    error: "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    description:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                    required:
                        "bg-gray-100 dark:text-gray-100 text-gray-900 dark:bg-slate-700",
                }}
            />

            {deletable && (
                <DeleteField onDelete={onDelete} index={collection} />
            )}
        </div>
    );
}
