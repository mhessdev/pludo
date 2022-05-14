import { faunaClient } from "./connection";
import { query as q } from "faunadb";

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
