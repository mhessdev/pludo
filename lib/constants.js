export const IMAGE_CDN = "https://cdn.thecyclemap.info/Images";

export const PLUDO_STRUCTURE = {
    fields: [
        {
            name: "content",
            value: "",
            type: "richtext",
        },
    ],
    tags: [],
    images: {
        featured: {},
        gallery: [],
    },
    published: false,
};

export const BASE_FORM = {
    title: "",
    slug: "",
    pludo: PLUDO_STRUCTURE,
};
