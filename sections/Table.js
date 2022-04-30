import TableTabs from "../components/TableTabs";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import { useState } from "react";
import Image from "next/image";
import { gameImageCDN } from "../lib/constants";
import Button from "../components/Button";

export default function Table({ rows }) {
  const [modalContent, setModalContent] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const jsonClick = (row) => {
    setModalContent(row);
    handleShow();
  };

  const imageClick = (path, imageName) => {
    let image = gameImageCDN + path + ".webp";
    setModalContent(
      <div className="aspect-w-16 aspect-h-9  relative mx-auto">
        <Image
          src={image}
          alt={imageName}
          layout="fill"
          objectFit="contain"
          sizes="50vw"
        />
      </div>
    );

    handleShow();
  };

  return (
    <>
      <section className="mt-6">
        <div className="flex justify-between items-center sticky">
          <TableTabs />
          <Pagination />
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-b-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Key
                </th>
                <th scope="col" className="px-6 py-3">
                  Image File
                </th>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  Published
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Json</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {row.name}
                  </th>
                  <td className="px-6 py-4">{row.key}</td>
                  <td className="px-6 py-4">
                    {(row.imageFile && (
                      <span
                        className="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-xs px-2 py-1 rounded-full"
                        onClick={() => imageClick(row.imagePath, row.imageFile)}
                      >
                        {row.imageFile}
                      </span>
                    )) || <Button text="Add Image" style="small" />}
                  </td>
                  <td className="px-6 py-4">{row.id}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-center space-x-3">
                      <label className="relative flex justify-between items-center group p-2">
                        {row.published ? "Published" : "Unplublished"}
                        <input
                          type="checkbox"
                          className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                        />
                        <span
                          className="w-12 h-4 flex items-center flex-shrink-0 ml-4 
                        p-1 bg-gray-300 rounded-full duration-300 
                        ease-in-out peer-checked:bg-green-400 
                        after:w-6 after:h-6 after:bg-white 
                        after:rounded-full after:shadow-md 
                        after:duration-300 peer-checked:after:translate-x-6
                         group-hover:after:translate-x-1"
                        ></span>
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      onClick={() => jsonClick(row)}
                    >
                      JSON
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Modal show={showModal} content={modalContent} onHide={handleClose} />
    </>
  );
}
