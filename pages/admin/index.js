import Layout from "@/sections/Layout";
import Table from "@/sections/Table";
import { getFolders } from "@/lib/spaces";
import { getCollections } from "@/lib/fauna/collections";
import { getRows } from "@/lib/fauna/functions";

export default function Admin({
    collection,
    collections,
    documents,
    folderList,
    after,
}) {
    return (
        <Layout>
            <Table
                collection={collection}
                tabs={collections}
                rows={documents}
                folderList={folderList}
                after={after}
            />
        </Layout>
    );
}

export async function getServerSideProps({ req, res }) {
    const folderList = await getFolders(
        "Images/",
        process.env.DO_SPACES_BUCKET
    );

    const collections = await getCollections();

    let documents = [];

    if (collections.length > 0) {
        documents = await getRows(collections[0]);
    }

    if (documents?.after) {
        documents.after.pop();
    }

    const after = documents?.after ?? [];

    return {
        props: {
            collection: collections[0],
            collections: collections,
            documents: documents.data,
            folderList: folderList,
            after: after,
        },
    };
}
