import { faunaClient } from "./connection";
import { query as q } from "faunadb";

export async function createFunction(name, code) {
    const faunaFunction = await faunaClient.query(
        q.CreateFunction({
            name: name,
            body: code,
        })
    );
    return faunaFunction;
}

export async function callFunction(functionName, params) {
    const faunaFunction = await faunaClient.query(q.Call(functionName, params));
    return faunaFunction;
}

export async function createGetRowsFunction() {
    const code = q.Query(
        q.Lambda(
            "collection",
            q.Let(
                { indexName: q.Concat([q.Var("collection"), "rows"], "_") },
                q.Map(
                    q.Paginate(q.Match(q.Index(q.Var("indexName")))),
                    q.Lambda(
                        [
                            "id",
                            "title",
                            "slug",
                            "featured",
                            "published",
                            "updatedAt",
                        ],
                        {
                            id: q.Var("id"),
                            title: q.Var("title"),
                            slug: q.Var("slug"),
                            featured: q.Var("featured"),
                            published: q.Var("published"),
                            updatedAt: q.Var("updatedAt"),
                            collection: Var("collection"),
                        }
                    )
                )
            )
        )
    );

    const getRows = await createFunction("getRows", code);

    return getRows;
}

export async function getRows(collection) {
    const rows = await callFunction("getRows", collection);
    return rows;
}
