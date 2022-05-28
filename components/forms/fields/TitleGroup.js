import InputText from "@/components/forms/fields/InputText";
import { useState } from "react";
import slugify from "slugify";

export default function TitleGroup({
    titleValue = "",
    slugValue = "",
    classes,
    onChange = () => null,
    disabled = false,
}) {
    return (
        <div className="">
            <InputText
                name="title"
                label="Title"
                placeholder="Item Name, Article Title, Guide Topic"
                required={true}
                classes={classes}
                value={titleValue}
                disabled={disabled}
                onChange={(e) =>
                    onChange(
                        e.target.value,
                        slugify(e.target.value, { lower: true, strict: true })
                    )
                }
            />
            <div className="mt-3 text-gray-400/50">
                <span>slug: {slugValue}</span>
                <InputText
                    name="slug"
                    required={true}
                    value={slugValue}
                    hidden={true}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}
