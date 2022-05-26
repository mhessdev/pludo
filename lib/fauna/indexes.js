import { faunaClient } from "./connection";
import { query as q } from "faunadb";

//indexes are essentially queries that can be used to find documents
// ex find a user based on email and return some values for that user

export async function createIndex({
    collection,
    name,
    terms,
    values,
    unique,
    serialized,
    permissions,
    data,
}) {
    if (!collection || !name) {
        throw new Error("Collection and Index Name are required");
    }

    if (!values && !terms) {
        throw new Error("Values or Terms are required");
    }

    let obj = {
        name: `${collection}_${name}`,
        ...(terms && { terms: terms }),
        ...(values && { values: values }),
        ...(unique && { unique: unique }),
        ...(serialized && { serialized: serialized }),
        ...(permissions && { permissions: permissions }),
        ...(data && { data: data }),
    };

    const index = await faunaClient.query(
        q.CreateIndex({
            ...obj,
            source: q.Collection(collection),
        })
    );
    return index;
}

export async function getIndex(index) {
    const documents = await faunaClient.query(
        q.Paginate(q.Match(q.Index(index)))
    );
    return documents;
}

export async function getDocumentsByIndexAndValue(index, value) {
    const documents = await faunaClient.query(
        q.Paginate(q.Match(q.Index(index), value))
    );
    return documents;
}

export async function createRowsIndex(collection) {
    const index = await createIndex({
        collection: collection,
        name: "rows",
        values: [
            { field: ["ref", "id"] },
            { field: ["data", "title"] },
            { field: ["data", "slug"] },
            { field: ["data", "images", "featured", "src"] },
            { field: ["data", "published"] },
            { field: ["data", "updatedAt"] },
        ],
    });

    return index;
}

export async function createBySlugIndex(collection) {
    const index = await createIndex({
        collection: collection,
        name: "By_Slug",
        terms: [
            {
                field: ["data", "slug"],
            },
        ],
        values: [
            {
                field: ["ref", "id"],
            },
            {
                field: ["data", "slug"],
            },
        ],
    });

    return index;
}
