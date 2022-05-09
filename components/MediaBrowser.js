import { useState, useRef } from "react";
import Image from "next/image";
import {
	TrashIcon,
	FolderIcon,
	ArrowsExpandIcon,
	PhotographIcon,
} from "@heroicons/react/outline";
import Toast from "../components/Toast";
import { IMAGE_CDN } from "../lib/constants";
import Modal from "../components/Modal";

export default function MediaBrowser({
	folderList,
	forEdit = false,
	replaceFunction = () => null,
}) {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState("");
	const [toastShow, setToastShow] = useState(false);
	const [folders, setFolders] = useState(folderList);
	const [files, setFiles] = useState([]);
	const [parentFolders, setParentFolders] = useState([
		{ prefix: "images/", folderName: "images" },
	]);
	const [curFolder, setCurFolder] = useState("images/");
	const lazyRoot = useRef();

	const [modalContent, setModalContent] = useState("");

	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const imageClick = (path, imageName) => {
		setModalContent(
			<>
				<div className="aspect-w-16 aspect-h-9 relative mx-auto">
					<Image
						src={path}
						alt={imageName}
						layout="fill"
						objectFit="contain"
						sizes="100vw"
					/>
				</div>
				{path}
			</>
		);

		handleShow();
	};

	const uploadToClient = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			for (let i = 0; i < e.target.files.length; i++) {
				const file = e.target.files[i];
				const reader = new FileReader();
				reader.onload = (e) => {
					setImages((images) => [
						...images,
						{
							name: file.name,
							src: e.target.result,
							file,
						},
					]);
				};
				reader.readAsDataURL(file);
			}
		}
		e.target.value = null;
	};

	const uploadToServer = async () => {
		const body = new FormData();
		if (images && images.length > 0) {
			for (let i = 0; i < images.length; i++) {
				let newFile = new File([images[i].file], images[i].name, {
					type: images[i].file.type,
				});
				body.append("images", newFile);
			}
		}
		setLoading(true);
		try {
			const response = await fetch("/api/upload-file", {
				method: "POST",
				body,
			});
			const data = await response.json();
			setToastShow(true);
			setMessage(data.message);
			setStatus(response.status);
			setImages([]);
		} catch (error) {
			setToastShow(true);
			setMessage(error);
			setStatus(data.status);
		}
		setLoading(false);
	};

	const changeImageName = (e, index) => {
		const newImages = [...images];
		newImages[index].name = e.target.value;
		setImages(newImages);
	};

	const deleteImage = (index) => {
		const newImages = [...images];
		newImages.splice(index, 1);
		setImages(newImages);
	};

	const getSubFolders = async (folder) => {
		setLoading(true);
		try {
			const response = await fetch("/api/list-folders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prefix: folder,
				}),
			});
			const data = await response.json();

			if (data.length > 0) {
				setCurFolder(folder);
				setFiles([]);
				setFolders(data);
			}
			try {
				const response = await fetch("/api/list-files", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						prefix: folder,
					}),
				});
				const data = await response.json();
				setFiles(data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}

			let folderPath = folder.split("/").slice(0, -1);
			let newParentFolders = [];
			for (let i = 0; i < folderPath.length; i++) {
				newParentFolders.push({
					prefix: folderPath.slice(0, i + 1).join("/") + "/",
					folderName: folderPath[i],
				});
			}
			setParentFolders(newParentFolders);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
	return (
		<>
			<div className="mt-10 grid h-auto w-full grid-cols-2 justify-center space-x-6 rounded bg-gray-100 p-6 dark:bg-gray-800">
				<div>
					<h2 className="mb-2">Folder Path</h2>
					<div
						className="flex  rounded-lg border border-gray-200 bg-gray-50 py-3 px-5 text-gray-700 dark:border-gray-700 dark:bg-gray-800"
						aria-label="Breadcrumb"
					>
						<ol className="inline-flex items-center space-x-1 divide-x-2 divide-slate-500 md:space-x-3">
							{parentFolders.map((parent, idx) => (
								<li
									className="inline-flex items-center pl-2"
									key={`parent-${idx}`}
								>
									<span
										onClick={() =>
											getSubFolders(parent.prefix)
										}
										className="inline-flex cursor-pointer items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
									>
										<FolderIcon className="mr-2 h-4 w-4" />
										{parent.folderName}
									</span>
								</li>
							))}
						</ol>
					</div>
					{folders.length !== 0 && (
						<div className="mt-3">
							<h3 className="mb-3">Sub-Folders</h3>
							<div className="flex flex-wrap gap-2">
								{folders.map((folder, idx) => (
									<button
										key={`folder-${idx}`}
										onClick={() => getSubFolders(folder)}
										type="button"
										className="mr-2 mb-2 flex rounded-lg border border-gray-300 
								bg-white px-5 py-2.5 text-lg font-medium leading-6 
								text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 
								focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white 
								dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
									>
										<FolderIcon className="mr-2 h-6 w-6" />
										{folder
											.replace(curFolder, "")
											.replace(/\//g, "")}
									</button>
								))}
							</div>
						</div>
					)}
					{files.length !== 0 && (
						<div
							className="mt-3 grid h-fit max-h-[75vh] grid-cols-3 gap-6 overflow-auto  scroll-smooth p-6"
							ref={lazyRoot}
						>
							{files.map((file) => (
								<div
									key={file}
									className="group group aspect-w-16 aspect-h-9 relative cursor-pointer"
								>
									<Image
										lazyRoot={lazyRoot}
										src={IMAGE_CDN + file}
										alt={file}
										layout="fill"
										objectFit="cover"
										sizes="50vw"
										className="group-hover:blur-sm"
									/>
									<div className="absolute top-10 my-auto hidden flex-row place-content-around group-hover:flex">
										<ArrowsExpandIcon
											onClick={() =>
												imageClick(
													IMAGE_CDN + file,
													file
												)
											}
											className=" h-10 w-10 cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
										/>
										{forEdit && (
											<PhotographIcon
												onClick={() =>
													replaceFunction(file)
												}
												className=" h-10 w-10 cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
											/>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
				<div className="grid h-fit grid-cols-1 gap-6">
					{/* <label
						htmlFor="default-search"
						className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Search
					</label>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								className="h-5 w-5 text-gray-500 dark:text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
						</div>
						<input
							type="search"
							id="default-search"
							className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
							placeholder="Search Images"
							required
						/>
						<button
							type="submit"
							className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Search
						</button>
					</div> */}
					<div className="flex flex-col gap-6 rounded border-2 border-dashed border-gray-600 p-3">
						<div>
							<label
								className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
								htmlFor="multiple_files"
							>
								Upload multiple files
							</label>
							<input
								className="block w-full cursor-pointer rounded-lg border 
          border-gray-300 bg-gray-50 text-sm text-gray-900 
          focus:outline-none dark:border-gray-600 dark:bg-gray-700 
          dark:text-gray-400 dark:placeholder-gray-400"
								id="multiple_files"
								type="file"
								multiple
								onChange={uploadToClient}
							/>
						</div>

						{images.length > 0 && (
							<div>
								<h2 className="mb-3">Images To Be Uploaded</h2>
								<div className="mb-6 grid h-auto grid-cols-3 gap-6">
									{images.map((image, idx) => (
										<div key={`image-${idx}`}>
											<div
												className="group aspect-w-16 aspect-h-9 
                      relative cursor-pointer rounded-lg border-gray-200 bg-white shadow-md 
                    hover:bg-gray-100 dark:border-gray-700
                    dark:bg-gray-800 dark:hover:bg-gray-700"
											>
												<TrashIcon
													className="z-10 m-auto hidden h-10 w-10 rounded-lg bg-gray-800/50 group-hover:block"
													onClick={(e) =>
														deleteImage(idx)
													}
												/>
												<Image
													src={image.src}
													alt={image.name}
													layout="fill"
													className="group-hover:blur-sm"
													objectFit="cover"
												/>
											</div>
											<div className="mt-3">
												<label
													htmlFor="small-input"
													className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
												>
													Name/Alt-Text
												</label>
												<input
													type="text"
													id="small-input"
													className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
													defaultValue={image.name}
													onChange={(e) =>
														changeImageName(e, idx)
													}
												/>
											</div>
										</div>
									))}
								</div>
								<button
									type="button"
									className="mb-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={() => uploadToServer()}
								>
									{loading ? "Uploading..." : "Upload To CDN"}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<Toast
				message={message}
				status={status}
				show={toastShow}
				onClose={() => setToastShow(false)}
			/>
			<Modal
				show={showModal}
				content={modalContent}
				onHide={handleClose}
			/>
		</>
	);
}
