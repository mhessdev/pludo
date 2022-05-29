import Image from "next/image";
import { IMAGE_CDN } from "@/lib/constants";

export default function MyImage({
    src,
    alt,
    layout = "intrinsic",
    objectFit,
    width,
    quality,
    className,
    sizes,
    lazyRoot,
}) {
    const myLoader = ({ src, width, quality }) => {
        // if (!quality) {
        //     quality = 75;
        // }
        // return `https://images.thegamedatabase.workers.dev?width=${width}&quality=${quality}&image=${IMAGE_CDN}${src}`;
        if (src.includes("https") || src.includes("http")) {
            return src;
        }
        let newSrc = IMAGE_CDN + "Images" + src.replace("Images", "");
        return newSrc;
    };

    return (
        <>
            <Image
                loader={myLoader}
                src={src}
                alt={alt}
                layout={layout}
                objectFit={objectFit}
                quality={quality}
                className={className}
                sizes={sizes}
                width={layout != "fill" ? width : undefined}
                lazyRoot={lazyRoot}
            />
        </>
    );
}
