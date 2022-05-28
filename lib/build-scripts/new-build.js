import {
    createGetRowsFunction,
    createUpsertDocumentsBySlugFunction,
    createCreateOrReplaceDocumentsBySlugFunction,
    createMergeUpsertBySlug,
} from "../fauna/functions";

export async function buildFaunaFunctions() {
    await createGetRowsFunction();
    await createUpsertDocumentsBySlugFunction();
    await createCreateOrReplaceDocumentsBySlugFunction();
    await createMergeUpsertBySlug();

    console.log("FAUNA FUNCTIONS BUILT");
    return true;
}

// users

// default posts

// await buildFaunaFunctions();
