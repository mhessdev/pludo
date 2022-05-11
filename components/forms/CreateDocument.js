import { useState } from "react";
import Button from "@/components/Button";
import InputText from "@/components/forms/fields/InputText";
import TitleGroup from "@/components/forms/fields/TitleGroup";
import FormHead from "@/components/forms/sections/FormHead";

export default function CreateDocument({ collection }) {
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        fields: [],
    });

    // [
    //     { name: "title", type: "text", label: "Title", value: "" },
    //     { name: "description", type: "text", label: "Description", value: "" },
    //     { name: "content", type: "text", label: "Content", value: "" },
    //     { name: "tags", type: "text", label: "Tags", value: "" },
    //     { name: "status", type: "text", label: "Status", value: "" },
    //     { name: "images", type: "text", label: "Image", value: "" },
    //     ...moreFields,
    // ]
    return (
        <>
            <FormHead
                title="Create Document"
                highlight={collection}
                description="Create a new document in the collection, add the fields needed or generate from another document in the same collection"
            />
            <form
                className="flex w-full flex-col gap-6 overflow-y-scroll scroll-smooth p-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(fields);
                }}
            >
                <TitleGroup />
                {/* {fields.map((field) => (
                    <div key={field.name} className="mb-6">
                        <label
                            htmlFor={field.name}
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            {field.label}
                        </label>
                        <input
                            className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            value={field.value}
                            onChange={(e) => {
                                setFields((prevState) => {
                                    return prevState.map((field) => {
                                        if (field.name === e.target.name) {
                                            field.value = e.target.value;
                                        }
                                        return field;
                                    });
                                });
                            }}
                        />
                    </div>
                ))} */}
                <Button text="Submit" style="full" />
            </form>
        </>
    );
}
