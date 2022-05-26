import { faunaClient } from "./connection";
import { query as q } from "faunadb";

// documents are json objects that represent rows in a database.

export async function createDocument(collection, data) {
    const document = await faunaClient.query(
        q.Create(collection, {
            data: {
                ...data,
                published: false,
                createdAt: q.ToString(q.Now()),
                updatedAt: q.ToString(q.Now()),
            },
        })
    );
    return document;
}

export async function getDocumentById(collection, id) {
    const document = await faunaClient.query(
        q.Get(q.Ref(q.Collection(collection), id))
    );
    return document;
}

export async function getDocumentsByCollection(collection, options = {}) {
    const documents = await faunaClient.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection(collection)), options),
            q.Lambda("ref", q.Get(q.Var("ref")))
        )
    );

    return documents.data.map((document) => {
        document.id = document.ref.id;
        delete document.ref;
        return document;
    });
}

export async function createDocuments(collection, data) {
    const collectionName = `${process.env.NEXT_PUBLIC_DB_PREFIX}_${collection}`;
    const documents = await faunaClient.query(
        q.Map(
            data,
            q.Lambda(
                "document",
                q.Create(collectionName, {
                    data: q.Merge(q.Var("document"), {
                        published: false,
                        createdAt: q.ToString(q.Now()),
                        updatedAt: q.ToString(q.Now()),
                    }),
                })
            )
        )
    );
    return documents;
}

export async function updateDocumentById(collection, id, data) {
    const document = await faunaClient.query(
        q.Update(q.Ref(q.Collection(collection), id), {
            data: {
                ...data,
                updatedAt: q.ToString(q.Now()),
            },
        })
    );
    return document;
}

// doesnt work move on for now
export async function upsertDocument(collection, id, data) {
    const upsertFunction = await getFunction("upsert_document");
    const document = await faunaClient.query(
        q.Call(q.Function(upsertFunction), [
            q.Ref(q.Collection(collection), id),
            {
                ...data,
                updatedAt: q.ToString(q.Now()),
            },
        ])
    );

    return document;
}
