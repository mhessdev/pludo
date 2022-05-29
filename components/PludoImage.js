import Image from "next/image";
import MyImage from "./MyImage";

export default function PludoImage({
    path,
    file,
    layout,
    fit,
    sizes,
    onClick,
    imageClasses,
    quality,
    alt,
    width,
    height,
    containerClasses,
}) {
    return (
        <div className="flex h-fit flex-row justify-between">
            <div
                className="group cursor-pointer"
                onClick={() => imageClick(row.imagePath, row.imageFile)}
            >
                <div className="aspect-w-5 aspect-h-1 relative mb-2">
                    {/* <Image
                        layout="fill"
                        objectFit="contain"
                        sizes="50vw"
                        src={IMAGE_CDN + "images" + row.imagePath + ".webp"}
                        quality={50}
                        alt={row.imageFile}
                        className="group-hover:opacity-75"
                    /> */}
                    <MyImage
                        layout="fill"
                        objectFit="contain"
                        sizes="50vw"
                        src={IMAGE_CDN + "images" + row.imagePath + ".webp"}
                        quality={50}
                        alt={row.imageFile}
                        className="group-hover:opacity-75"
                    />
                </div>
                <div className=" w-fit cursor-pointer rounded-full bg-gray-100 px-2 py-1 text-xs group-hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600">
                    {row.imageFile}
                </div>
            </div>
            {/* <PencilAltIcon
                onClick={() => replaceImage()}
                className="ml-1 h-8 w-8 cursor-pointer place-self-end self-center hover:text-slate-600  dark:hover:text-gray-50"
            /> */}
        </div>
    );
}
