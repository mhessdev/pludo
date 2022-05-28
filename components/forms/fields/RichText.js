import RichTextEditor from "@/components/forms/fields/RichText-Setup";
import Label from "@/components/forms/fields/Label";
import DeleteField from "@/components/forms/tools/DeleteField";

export default function RichText({
    index,
    name,
    label,
    required,
    hidden,
    value,
    editName,
    deletable,
    onNameChange = () => null,
    onChange = () => null,
    onDelete = () => null,
}) {
    return (
        <div key={`${index}-${name}`}>
            <Label
                name={name}
                label={label}
                required={required}
                hidden={hidden}
                index={index}
                editName={editName}
                onNameChange={onNameChange}
            />
            <div className="flex h-96 flex-row gap-3">
                <RichTextEditor
                    key={index}
                    value={value}
                    onChange={(e) => onChange(name, e)}
                    classNames={{
                        root: "min-h-full overflow-y-auto",
                        toolBarInner: "min-h-full",
                    }}
                />
                {deletable && <DeleteField onDelete={onDelete} index={index} />}
            </div>
        </div>
    );
}
