export default function InputText({
    name,
    value = null,
    onChange = () => null,
    placeholder,
    label,
    required = false,
    disabled = false,
    classes = "",
    hidden = false,
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
        <div key={name}>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {label}
            </label>

            <input
                className={`${disabled ? disabledCss : css} ${classes} ${
                    hidden ? "hidden" : ""
                }`}
                type="text"
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                disabled={disabled}
            />
        </div>
    );
}
