import { faunaClient } from "./connection";
import { query as q } from "faunadb";

export async function createIndex(
    collection,
    name,
    terms,
    values,
    unique,
    serialized,
    permissions,
    data
) {
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
