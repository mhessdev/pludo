import { faunaClient } from "./connection";
import { query as q } from "faunadb";

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
