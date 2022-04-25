import Layout from "../../sections/Layout";
import Table from "../../sections/Table";
import faunaQueries from "../../lib/fauna";

export default function Items({ items }) {
  return (
    <Layout>
      <Table rows={items} />
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { data } = await faunaQueries.getAllDocs("items", { size: 64 });

    // getdocsconsole.log(data);

    return {
      props: { items: data },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}
