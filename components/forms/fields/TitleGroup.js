import InputText from "@/components/forms/fields/InputText";
import { useState } from "react";
import slugify from "slugify";

export default function TitleGroup({
    value,
    slug,
    classes,
    onChange = () => null,
}) {
    const [slugValue, setSlugValue] = useState(slug);

    const handleChange = (e) => {
        setSlugValue(slugify(e.target.value, { lower: true, strict: true }));
        //onChange(e);
    };

    return (
        <div className="">
            <InputText
                name="title"
                label="Title"
                placeholder="Item Name, Article Title, Guide Topic"
                required={true}
                classes={classes}
                value={value}
                onChange={handleChange}
            />
            <div className="mt-3 text-gray-400/50">
                <span>slug: {slugValue}</span>
            </div>
        </div>
    );
}
