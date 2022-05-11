import Layout from "@/sections/Layout";
import MediaBrowser from "@/components/MediaBrowser";
import { getFolders } from "@/lib/spaces";

export default function Test({ folderList }) {
    return (
        <Layout>
            <MediaBrowser folderList={folderList} />
        </Layout>
    );
}

export async function getServerSideProps() {
    const folderList = await getFolders(
        "images/",
        process.env.DO_SPACES_BUCKET
    );

    return {
        props: { folderList: folderList },
    };
}
