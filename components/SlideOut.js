export default function SlideOut({ show, onHide, content }) {
    return (
        <div
            className={`fixed top-0 right-0 z-20 h-screen w-screen transition-all 
                ${show ? "-translate-x-0" : "translate-x-full"}
            `}
        >
            <div
                className="fixed top-0 right-0 z-20 h-screen w-screen bg-black/20 transition-all"
                onClick={onHide}
            ></div>
            <div
                className={`absolute top-0 right-0 z-30 flex h-full w-1/2 flex-col
                    overflow-y-scroll bg-slate-50 drop-shadow-2xl transition-all duration-500 
                    ease-in-out dark:bg-slate-800
                    ${show ? "-translate-x-0" : "translate-x-full"}
                `}
            >
                {content}
            </div>
        </div>
    );
}
