import Label from "@/components/forms/fields/Label";
import DeleteField from "@/components/forms/tools/DeleteField";
export default function InputText({
    name,
    value = null,
    placeholder,
    label,
    required = false,
    disabled = false,
    classes = "",
    hidden = false,
    index,
    editName = false,
    deletable = false,
    onChange = () => null,
    onNameChange = () => null,
    onDelete = () => null,
}) {
    const css = `dark:shadow-sm-light block w-full rounded-lg border border-gray-300 
        bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 
        focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
        dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`;
    const disabledCss = `mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed 
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400
        dark:focus:ring-blue-500 dark:focus:border-blue-500`;
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
            <div className="flex flex-row gap-3">
                <input
                    className={`${disabled ? disabledCss : css} ${classes} ${
                        hidden ? "invisible h-0 p-0" : ""
                    }`}
                    type="text"
                    name={name}
                    id={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    hidden={hidden}
                />
                {deletable && <DeleteField onDelete={onDelete} index={index} />}
            </div>
        </div>
    );
}
