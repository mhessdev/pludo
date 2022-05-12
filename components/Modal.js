export default function Modal({ show, onHide, content }) {
    return (
        <div
            id="defaultModal"
            tabIndex="-1"
            className={`fixed top-0 right-0 left-0 z-30 flex 
      h-screen w-screen overflow-y-auto overflow-x-hidden ${
          show ? "block" : " hidden"
      }`}
        >
            <div
                className="fixed top-0 right-0 left-0 z-40 h-screen w-screen bg-gray-900/50"
                onClick={onHide}
            ></div>

            <div className="h-max-2/3 w-max-2/3 relative mx-auto mt-24 h-fit w-fit p-4">
                <div className="relative z-50 rounded-lg bg-white shadow dark:bg-gray-700">
                    {/* <textarea value={JSON.stringify(content)}></textarea> */}
                    {content}
                </div>
            </div>
        </div>
    );
}
