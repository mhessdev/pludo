import Layout from "@/sections/Layout";
import Table from "@/sections/Table";
import { getFolders } from "@/lib/spaces";
import { getCollections } from "@/lib/fauna/collections";
import { getRows } from "@/lib/fauna/functions";

export default function CollectionPage({
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

export async function getServerSideProps({ params }) {
    const folderList = await getFolders(
        "images/",
        process.env.DO_SPACES_BUCKET
    );

    const collections = await getCollections();

    const documents = await getRows(params.collection);

    return {
        props: {
            collection: params.collection,
            collections: collections,
            documents: documents.data,
            folderList: folderList,
        },
    };
}
