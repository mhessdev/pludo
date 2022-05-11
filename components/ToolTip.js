export default function ToolTip({ direction, content, classes, id }) {
    directionStyles = {
        top: `inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium 
            text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700`,
        right: `inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white 
            bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700`,
        bottom: `inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white 
            bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700`,
        left: `inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white
             bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700`,
    };

    return (
        <div
            id={id}
            role="tooltip"
            className={`${directionStyles[direction]} ${classes}`}
        >
            {content}
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    );
}
