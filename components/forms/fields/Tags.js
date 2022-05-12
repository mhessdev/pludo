import DeleteField from "@/components/forms/tools/DeleteField";
import { MultiSelect } from "@mantine/core";

export default function Tags({
    collection,
    curTags,
    options,
    onChange = () => null,
}) {
    const selectData = options.map((option) => {
        return {
            label: option.data?.title ? option.data?.title : option.id,
            value: option.id,
            title: option.data?.title,
            name: option.data?.title ? option.data?.title : option.id,
        };
    });

    console.log(selectData);

    return (
        <div key={`${collection}`}>
            {/* <label
                htmlFor={collection}
                className="mb-2 block w-fit text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
            >
                Tagged By {collection}
            </label> */}
            {/* <div className="flex flex-row gap-3"> */}
            <MultiSelect
                data={selectData}
                label={`Tagged By ${collection}`}
                placeholder="Pick all that you like"
                searchable
                nothingFound="Nothing found"
                value={curTags}
                onChange={(e) => onChange(collection, e)}
            />
            {/* {options.map((option, index) => (
                    <div key={`${option.id}`}>
                        <input
                            type="checkbox"
                            name={option.id}
                            id={option.id}
                            value={option.id}
                            // checked={curTags.includes(option)}
                        />
                        <label
                            htmlFor={option}
                            className="block w-fit text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
                        >
                            {option.id}
                        </label>
                    </div>
                ))} */}
            {/* </div> */}
        </div>
    );
}
