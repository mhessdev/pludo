import { faunaClient } from "./connection";
import { query as q } from "faunadb";
import { PLUDO_STRUCTURE } from "../constants";

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
            ["collection", "after"],
            q.Let(
                { indexName: q.Concat([q.Var("collection"), "rows"], "_") },
                q.Map(
                    Paginate(Match(Index(Var("indexName"))), {
                        after: Var("after"),
                        size: 64,
                    }),
                    q.Lambda(
                        [
                            "id",
                            "title",
                            "slug",
                            "pludoFeatured",
                            "gameFeatured",
                            "published",
                            "updatedAt",
                        ],
                        {
                            id: q.Var("id"),
                            title: q.Var("title"),
                            slug: q.Var("slug"),
                            pludoFeatured: q.Var("pludoFeatured"),
                            gameFeatured: q.Var("gameFeatured"),
                            published: q.Var("published"),
                            updatedAt: q.Var("updatedAt"),
                            collection: q.Var("collection"),
                        }
                    )
                )
            )
        )
    );

    const getRows = await createFunction("getRows", code);

    return getRows;
}

export async function getRows(collection, after = []) {
    if (after.length > 0) {
        after.push(q.Ref(q.Collection(collection), after[0]));
    }

    const rows = await callFunction("getRows", [collection, after]);
    return rows;
}

export async function createUpsertDocumentsBySlugFunction() {
    const code = q.Query(
        q.Lambda(
            ["collection", "documents"],
            q.Map(
                q.Var("documents"),
                q.Lambda(
                    "document",
                    q.Let(
                        {
                            docRef: q.Match(
                                q.Index(
                                    q.Concat([q.Var("collection"), "_By_Slug"])
                                ),
                                q.Select("slug", q.Var("document"))
                            ),
                        },
                        q.If(
                            q.IsEmpty(q.Var("docRef")),
                            q.Create(q.Var("collection"), {
                                data: q.Merge(q.Var("document"), {
                                    pludo: PLUDO_STRUCTURE,
                                    createdAt: q.ToString(q.Now()),
                                    updatedAt: q.ToString(q.Now()),
                                }),
                            }),
                            q.Update(q.Select("ref", q.Get(q.Var("docRef"))), {
                                data: q.Merge(q.Var("document"), {
                                    updatedAt: q.ToString(q.Now()),
                                }),
                            })
                        )
                    )
                )
            )
        )
    );

    const upsertDocumentsBySlug = await createFunction(
        "upsertDocumentsBySlug",
        code
    );

    return upsertDocumentsBySlug;
}

export async function upsertDocumentsBySlug(collection, documents) {
    const response = await callFunction("upsertDocumentsBySlug", [
        collection,
        documents,
    ]);
    return response;
}

export async function createCreateOrReplaceDocumentsBySlugFunction() {
    const code = q.Query(
        q.Lambda(
            ["collection", "documents"],
            q.Map(
                q.Var("documents"),
                q.Lambda(
                    "document",
                    q.Let(
                        {
                            docRef: q.Match(
                                q.Index(
                                    q.Concat([q.Var("collection"), "_By_Slug"])
                                ),
                                q.Select("slug", q.Var("document"))
                            ),
                        },
                        q.If(
                            q.IsEmpty(q.Var("docRef")),
                            q.Create(q.Var("collection"), {
                                data: q.Merge(q.Var("document"), {
                                    pludo: PLUDO_STRUCTURE,
                                    createdAt: q.ToString(q.Now()),
                                    updatedAt: q.ToString(q.Now()),
                                }),
                            }),
                            q.Replace(q.Select("ref", q.Get(q.Var("docRef"))), {
                                data: q.Merge(q.Var("document"), {
                                    pludo: PLUDO_STRUCTURE,
                                    updatedAt: q.ToString(q.Now()),
                                }),
                            })
                        )
                    )
                )
            )
        )
    );

    const createOrReplaceDocumentsBySlug = await createFunction(
        "createOrReplaceDocumentsBySlug",
        code
    );

    return createOrReplaceDocumentsBySlug;
}

export async function createOrReplaceDocumentsBySlug(collection, documents) {
    const response = await callFunction("createOrReplaceDocumentsBySlug", [
        collection,
        documents,
    ]);
    return response;
}

export async function createMergeUpsertBySlug() {
    const code = q.Query(
        q.Lambda(
            ["collection", "documents"],
            q.Map(
                q.Var("documents"),
                q.Lambda(
                    "document",
                    q.Let(
                        {
                            docRef: q.Match(
                                q.Index(
                                    q.Concat([q.Var("collection"), "_By_Slug"])
                                ),
                                q.Select("slug", q.Var("document"))
                            ),
                        },
                        q.If(
                            q.IsEmpty(q.Var("docRef")),
                            q.Create(q.Var("collection"), {
                                data: q.Merge(q.Var("document"), {
                                    pludo: PLUDO_STRUCTURE,
                                    createdAt: q.ToString(q.Now()),
                                    updatedAt: q.ToString(q.Now()),
                                }),
                            }),
                            q.Merge(q.Get(q.Var("docRef")), {
                                data: q.Merge(q.Var("document"), {
                                    updatedAt: q.ToString(q.Now()),
                                }),
                            })
                        )
                    )
                )
            )
        )
    );

    const createMergeUpsertBySlug = await createFunction(
        "mergeUpsertBySlug",
        code
    );

    return createMergeUpsertBySlug;
}

export async function mergeUpsertBySlug(collection, documents) {
    const response = await callFunction("mergeUpsertBySlug", [
        collection,
        documents,
    ]);
    return response;
}
