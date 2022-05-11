import Layout from "../sections/Layout";
import Table from "../sections/Table";
import { getFolders } from "../lib/spaces";
import faunaQueries from "../lib/fauna-old";

export default function Items({ items, folderList }) {
	return (
		<Layout>
			<Table rows={items} folderList={folderList} />
		</Layout>
	);
}

export async function getStaticProps() {
	const { data } = await faunaQueries.getAllDocs("items", { size: 64 });
	const folderList = await getFolders(
		"images/",
		process.env.DO_SPACES_BUCKET
	);

	return {
		props: { items: data, folderList: folderList },
	};
}
