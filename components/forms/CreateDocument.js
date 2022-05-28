import { useState, useEffect } from "react";
import { useAppContext } from "@/components/context/AppWrapper";
import Button from "@/components/Button";
import InputText from "@/components/forms/fields/InputText";
import TitleGroup from "@/components/forms/fields/TitleGroup";
import FormHead from "@/components/forms/sections/FormHead";
import RichText from "@/components/forms/fields/RichText";
import Tags from "@/components/forms/fields/Tags";
import DocImages from "@/components/forms/fields/DocImages";
import {
    getCookie,
    setCookies,
    removeCookies,
    checkCookies,
} from "cookies-next";
import { BASE_FORM } from "@/lib/constants";

export default function CreateDocument({ collection, folderList }) {
    const { toast, modal, slideOut } = useAppContext();

    const [formData, setFormData] = useState(
        checkCookies("create-doc")
            ? JSON.parse(getCookie("create-doc"))
            : BASE_FORM
    );

    const [history, setHistory] = useState([formData]);

    const loadHistory = (history) => {
        setFormData(history);
    };

    useEffect(() => {
        setCookies("create-doc", formData);
        setHistory((prevState) => [...prevState, formData]);
    }, [formData]);

    const handleClear = () => {
        modal.setModalContent(
            <div className="flex flex-col items-center justify-center p-6">
                <h1 className="text-center text-xl">
                    Are you sure you want to clear the form?
                </h1>
                <div className="mt-4 flex flex-row justify-center gap-3">
                    <span
                        className="cursor-pointer rounded-md bg-sky-600 p-2 text-xl text-gray-100 hover:bg-sky-500"
                        onClick={() => {
                            modal.handleClose();
                        }}
                    >
                        Cancel
                    </span>
                    <span
                        className="cursor-pointer rounded-md bg-red-500 p-2 text-xl text-gray-100 hover:bg-red-400"
                        onClick={() => {
                            removeCookies("create-doc");
                            setFormData(BASE_FORM);
                            modal.handleClose();
                        }}
                    >
                        Clear Form
                    </span>
                </div>
            </div>
        );
        modal.handleShow();
    };

    const handleNewTags = (collection, options) => {
        setFormData((prevState) => ({
            ...prevState.pludo,
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
        setFormData((prevState) => ({
            ...prevState.pludo,
            tags: prevState.tags.map((tag) => {
                if (tag.collection === collection) {
                    return { ...tag, curTags: selectedTags };
                } else {
                    return tag;
                }
            }),
        }));
    };

    const handleNewField = (type) => {
        setFormData((prevState) => ({
            ...prevState.pludo,
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
    };

    const handleTitleChange = (title, slug) => {
        setFormData((prevState) => ({
            ...prevState,
            title: title,
            slug: slug,
        }));
    };

    const handleFieldChange = (field, value) => {
        setFormData((prevState) => ({
            ...prevState.pludo,
            fields: prevState.fields.map((f) =>
                f.name === field ? { ...f, value: value } : f
            ),
        }));
    };

    const handleFieldNameChange = (idx, name) => {
        if (formData.pludo.fields.filter((f) => f.name === name).length > 0) {
            toast.setMessage("Field names must be unique");
            toast.setStatus(500);
            toast.setToastShow(true);
            return null;
        }
        setFormData((prevState) => ({
            ...prevState.pludo,
            fields: prevState.fields.map((f, index) =>
                idx === index ? { ...f, name: name } : f
            ),
        }));
    };

    const handleFieldDelete = (idx) => {
        setFormData((prevState) => ({
            ...prevState.pludo,
            fields: prevState.fields.filter((f, index) => index !== idx),
        }));
    };

    const handleTagDelete = (collection) => {
        setFormData((prevState) => ({
            ...prevState.pludo,
            tags: prevState.tags.filter((tag) => tag.collection !== collection),
        }));
    };

    const handleImageSelect = (image) => {
        setFormData((prevState) => ({
            ...prevState.pludo,
            images: {
                ...prevState.images,
                gallery: [...prevState.images.gallery, { src: image }],
            },
        }));

        if (!formData.images.featured?.src) {
            handleMakeFeatured(0);
        }
    };

    const handleImageAltChange = (index, newAlt) => {
        if (index === "featured") {
            setFormData((prevState) => ({
                ...prevState.pludo,
                images: {
                    ...prevState.images,
                    featured: {
                        ...prevState.images.featured,
                        alt: newAlt,
                    },
                },
            }));

            return null;
        }

        setFormData((prevState) => ({
            ...prevState.pludo,
            images: {
                ...prevState.images,
                gallery: prevState.images.gallery.map((image, idx) =>
                    idx === index ? { ...image, alt: newAlt } : image
                ),
            },
        }));
    };

    const handleImageDelete = (index) => {
        if (index === "featured") {
            setFormData((prevState) => ({
                ...prevState.pludo,
                images: {
                    ...prevState.images,
                    featured: prevState.images.gallery[0],
                    gallery: prevState.images.gallery.slice(1),
                },
            }));
            return null;
        }

        setFormData((prevState) => ({
            ...prevState.pludo,
            images: {
                ...prevState.images,
                gallery: prevState.images.gallery.filter(
                    (image, idx) => idx !== index
                ),
            },
        }));
    };

    const handleMakeFeatured = (index) => {
        setFormData((prevState) => ({
            ...prevState.pludo,
            images: {
                ...prevState.images,
                featured: prevState.images.gallery[index],
                gallery: [
                    ...prevState.images.gallery.filter(
                        (image, idx) => idx !== index
                    ),
                    prevState.images.featured,
                ],
            },
        }));

        setFormData((prevState) => ({
            ...prevState.pludo,
            images: {
                ...prevState.images,
                gallery: prevState.images.gallery.filter(
                    (image, idx) => image?.src
                ),
            },
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/pludo/fauna/create-document", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    collection: collection,
                    data: {
                        title: formData.title,
                        slug: formData.slug,
                        fields: formData.pludo.fields,
                        tags: formData.pludo.tags,
                        images: formData.pludo.images,
                    },
                }),
            });
            const data = await response.json();
            toast.setMessage("Created document successfully");
            toast.setStatus(200);
            slideOut.handleSlideClose();
            removeCookies("create-doc");
            setFormData(BASE_FORM);
        } catch (error) {
            toast.setMessage(error.message);
            toast.setStatus(500);
        }
        toast.setToastShow(true);
    };

    return (
        <>
            <FormHead
                collection={collection}
                description="Create a new document in the collection, add the fields needed or generate from another document in the same collection"
                addFormField={handleNewField}
                addTags={handleNewTags}
                history={history}
                reloadHistory={loadHistory}
                clearForm={handleClear}
            />
            <form
                className="flex w-full flex-col gap-6 p-6"
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
                {formData.pludo.fields.map((field, index) => {
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
                {formData.pludo.tags.map((tag, index) => {
                    return (
                        <Tags
                            key={index}
                            index={index}
                            collection={tag.collection}
                            curTags={tag.curTags}
                            options={tag.options}
                            onChange={selectTags}
                            deletable={true}
                            onDelete={handleTagDelete}
                        />
                    );
                })}
                <DocImages
                    images={formData.pludo.images}
                    folderList={folderList}
                    onSelectImage={handleImageSelect}
                    onAltChange={handleImageAltChange}
                    onDelete={handleImageDelete}
                    onMakeFeatured={handleMakeFeatured}
                />
                <div
                    className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-green-500 p-6  text-gray-100  hover:bg-green-400 hover:drop-shadow-xl"
                    onClick={() => handleSubmit()}
                >
                    <span className="text-3xl">SUBMIT</span>
                </div>
            </form>
        </>
    );
}
