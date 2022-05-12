import { useState } from "react";
import Button from "@/components/Button";
import InputText from "@/components/forms/fields/InputText";
import TitleGroup from "@/components/forms/fields/TitleGroup";
import FormHead from "@/components/forms/sections/FormHead";
import { useAppContext } from "@/components/context/AppWrapper";
import RichText from "@/components/forms/fields/RichText";
import Tags from "@/components/forms/fields/Tags";

export default function CreateDocument({ collection }) {
    const { toast } = useAppContext();

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        fields: [],
        tags: [],
    });

    const [history, setHistory] = useState([formData]);

    const loadHistory = (history) => {
        setFormData(history);
    };

    const handleNewTags = (collection, options) => {
        console.log(collection, "IN HANDLE NEW TAGS");
        setFormData((prevState) => ({
            ...prevState,
            tags: [
                ...prevState.tags,
                {
                    collection: collection,
                    curTags: [],
                    options: options,
                },
            ],
        }));
    };

    const selectTags = (collection, selectedTags) => {
        console.log(collection, selectedTags, "IN SELECT TAGS");

        setFormData((prevState) => ({
            ...prevState,
            tags: prevState.tags.map((tag) => {
                if (tag.collection === collection) {
                    return { ...tag, curTags: selectedTags };
                } else {
                    return tag;
                }
            }),
        }));

        console.log(formData, "IN SELECT TAGS FOR DATA");
    };

    const handleNewField = (type) => {
        setFormData((prevState) => ({
            ...prevState,
            fields: [
                ...prevState.fields,
                {
                    name:
                        "FIELD_TEMP_" +
                        (Math.random() + 1).toString(36).substring(7),
                    value: "",
                    type: type,
                },
            ],
        }));
        setHistory([...history, formData]);
    };

    const handleTitleChange = (title, slug) => {
        setFormData((prevState) => ({
            ...prevState,
            title: title,
            slug: slug,
        }));
        setHistory([...history, formData]);
    };

    const handleFieldChange = (field, value) => {
        setFormData((prevState) => ({
            ...prevState,
            fields: prevState.fields.map((f) =>
                f.name === field ? { ...f, value: value } : f
            ),
        }));
        setHistory([...history, formData]);
    };

    const handleFieldNameChange = (idx, name) => {
        if (formData.fields.filter((f) => f.name === name).length > 0) {
            toast.setMessage("Field names must be unique");
            toast.setStatus(500);
            toast.setToastShow(true);
            return null;
        }
        setFormData((prevState) => ({
            ...prevState,
            fields: prevState.fields.map((f, index) =>
                idx === index ? { ...f, name: name } : f
            ),
        }));
        setHistory([...history, formData]);
    };

    const handleFieldDelete = (idx) => {
        setFormData((prevState) => ({
            ...prevState,
            fields: prevState.fields.filter((f, index) => index !== idx),
        }));
        setHistory([...history, formData]);
    };

    return (
        <>
            <FormHead
                title="Create Document"
                highlight={collection}
                description="Create a new document in the collection, add the fields needed or generate from another document in the same collection"
                addFormField={handleNewField}
                addTags={handleNewTags}
                history={history}
                reloadHistory={loadHistory}
            />
            <form
                className="flex w-full flex-col gap-6 overflow-y-scroll scroll-smooth p-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(formData);
                }}
            >
                <TitleGroup
                    titleValue={formData.title}
                    slugValue={formData.slug}
                    onChange={handleTitleChange}
                />
                {formData.fields.map((field, index) => {
                    switch (field.type) {
                        case "text":
                            return (
                                <InputText
                                    key={index}
                                    index={index}
                                    name={field.name}
                                    label={field.name}
                                    value={field.value}
                                    editName={true}
                                    deletable={true}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            field.name,
                                            e.target.value
                                        )
                                    }
                                    onNameChange={handleFieldNameChange}
                                    onDelete={handleFieldDelete}
                                />
                            );
                        case "richtext":
                            return (
                                <RichText
                                    key={index}
                                    index={index}
                                    name={field.name}
                                    label={field.name}
                                    value={field.value}
                                    editName={true}
                                    deletable={true}
                                    onNameChange={handleFieldNameChange}
                                    onChange={handleFieldChange}
                                    onDelete={handleFieldDelete}
                                />
                            );

                        default:
                            return null;
                    }
                })}
                {console.log(formData.tags)}
                {formData.tags.map((tag, index) => {
                    console.log(tag);
                    return (
                        <Tags
                            key={index}
                            index={index}
                            collection={tag.collection}
                            curTags={tag.curTags}
                            options={tag.options}
                            onChange={selectTags}
                        />
                    );
                })}
                <Button text="Submit" style="full" type="submit" />
            </form>
        </>
    );
}
