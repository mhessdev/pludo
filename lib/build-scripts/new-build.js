import {
    createGetRowsFunction,
    createUpsertDocumentsBySlugFunction,
    createCreateOrReplaceDocumentsBySlugFunction,
} from "../fauna/functions";

export async function buildFaunaFunctions() {
    await createGetRowsFunction();
    await createUpsertDocumentsBySlugFunction();
    await createCreateOrReplaceDocumentsBySlugFunction();

    console.log("FAUNA FUNCTIONS BUILT");
    return true;
}

// users

// default posts

// await buildFaunaFunctions();
