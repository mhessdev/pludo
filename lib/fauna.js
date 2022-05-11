import faunadb, { query as q, parseJSON } from "faunadb";

const faunaClient = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
});

// Collection Functions
export async function createCollection(name) {
    const collectionName = `${process.env.NEXT_PUBLIC_DB_PREFIX}_${name}`;
    const collection = await faunaClient.query(
        q.CreateCollection({
            name: collectionName,
        })
    );
    return collection;
}

export async function getCollections() {
    const collections = await faunaClient.query(
        q.Filter(
            q.Map(
                q.Paginate(q.Collections()),
                q.Lambda("collection", q.Select("id", q.Var("collection")))
            ),
            q.Lambda(
                "collectionName",
                q.ContainsStr(
                    q.Var("collectionName"),
                    process.env.NEXT_PUBLIC_DB_PREFIX
                )
            )
        )
    );

    return collections.data;
}

// Index Functions
export async function createIndex(collection, name, fields) {
    const index = await faunaClient.query(
        q.CreateIndex({
            name: name,
            source: q.Collection(collection),
            terms: fields,
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

// Function Functions
export async function createFunction(name, code) {
    const functionName = `${name}_function`;
    const faunaFunction = await faunaClient.query(
        q.CreateFunction({
            name: functionName,
            body: code,
        })
    );
    return faunaFunction;
}

export async function getFunction(name) {
    const faunaFunction = await faunaClient.query(q.Get(q.Function(name)));
    return faunaFunction;
}

// Document Functions
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
