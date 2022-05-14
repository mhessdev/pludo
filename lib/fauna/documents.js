import { faunaClient } from "./connection";
import { query as q } from "faunadb";

export async function createDocument(collectionRef, data) {
    const document = await faunaClient.query(
        q.Create(collectionRef, {
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

export async function getDocumentById(collectionRef, id) {
    const document = await faunaClient.query(
        q.Get(q.Ref(q.Collection(collectionRef), id))
    );
    return document;
}

export async function getDocumentsByCollection(collectionRef, options = {}) {
    const documents = await faunaClient.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection(collectionRef)), options),
            q.Lambda("ref", q.Get(q.Var("ref")))
        )
    );

    return documents.data.map((document) => {
        document.id = document.ref.id;
        delete document.ref;
        return document;
    });
}

export async function createDocuments(collectionRef, data) {
    const documents = await faunaClient.query(
        q.Map(
            data,
            q.Lambda(
                "document",
                q.Create(collectionRef, {
                    data: q.Merge(q.Var("document"), {
                        published: false,
                        createdAt: q.ToString(q.Now()),
                        updatedAt: q.ToString(q.Now()),
                    }),
                })
            )
        )
    );
    return documents?.data;
}

export async function updateDocumentById(collectionRef, id, data) {
    const document = await faunaClient.query(
        q.Update(q.Ref(q.Collection(collectionRef), id), {
            data: {
                ...data,
                updatedAt: q.ToString(q.Now()),
            },
        })
    );
    return document;
}

// doesnt work move on for now
export async function upsertDocument(collectionRef, id, data) {
    const upsertFunction = await getFunction("upsert_document");
    const document = await faunaClient.query(
        q.Call(q.Function(upsertFunction), [
            q.Ref(q.Collection(collectionRef), id),
            {
                ...data,
                updatedAt: q.ToString(q.Now()),
            },
        ])
    );

    return document;
}
