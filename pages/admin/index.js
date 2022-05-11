import Layout from "@/sections/Layout";
import Table from "@/sections/Table";
import { getFolders } from "@/lib/spaces";
import { getCollections, getDocumentsByCollection } from "@/lib/fauna";

export default function Admin({
    collection,
    collections,
    documents,
    folderList,
}) {
    return (
        <Layout>
            <Table
                collection={collection}
                tabs={collections}
                rows={documents}
                folderList={folderList}
            />
        </Layout>
    );
}

export async function getServerSideProps() {
    const folderList = await getFolders(
        "images/",
        process.env.DO_SPACES_BUCKET
    );

    const collections = await getCollections();

    let documents = [];

    if (collections.length > 0) {
        documents = await getDocumentsByCollection(collections[0]);
    }

    return {
        props: {
            collection: collections[0],
            collections: collections,
            documents: documents,
            folderList: folderList,
        },
    };
}
