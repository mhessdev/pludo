import { useEffect } from "react";
export default function Toast({
    show,
    message,
    status,
    onClose = () => null,
    side,
}) {
    const statusStyles = {
        200: "p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800",
        500: "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800",
        401: "p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800",
    };

    useEffect(() => {
        setTimeout(() => {
            onClose(false);
        }, 5000);
    }, [onClose]);

    if (!show) return null;
    return (
        <div
            onClick={() => onClose(false)}
            className={`fixed bottom-0 z-50 cursor-pointer drop-shadow-sm transition-all ease-in-out hover:-translate-y-1 hover:drop-shadow-lg
        ${side == "right" ? "right-5" : "left-5"}
      `}
        >
            <div className={statusStyles[status]}>
                <span className="font-medium">{message}</span>
            </div>
        </div>
    );
}
