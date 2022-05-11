import Layout from "@/sections/Layout";
import Table from "@/sections/Table";
import { getFolders } from "@/lib/spaces";
import { getCollections, getDocumentsByCollection } from "@/lib/fauna";

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

    const documents = await getDocumentsByCollection(params.collection);

    return {
        props: {
            collection: params.collection,
            collections: collections,
            documents: documents,
            folderList: folderList,
        },
    };
}
