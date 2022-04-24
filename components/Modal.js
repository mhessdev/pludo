export default function Modal({ show, onHide, content }) {
  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 
      z-10 w-screen h-screen flex ${show ? "block" : " hidden"}`}
    >
      <div
        className="fixed top-0 right-0 left-0 z-20 bg-gray-900/50 w-screen h-screen"
        onClick={onHide}
      ></div>
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto m-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 z-30">
          <textarea value={JSON.stringify(content)}></textarea>
        </div>
      </div>
    </div>
  );
}
