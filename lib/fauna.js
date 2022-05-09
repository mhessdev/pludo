import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import faunadb, { query as q } from "faunadb";

export const flattenData = (obj) => {
	if (!obj) return null;

	if (Array.isArray(obj.data)) {
		return {
			...obj,
			data: obj.data.map((e) => flattenData(e)),
		};
	} else {
		return { ...obj.data, id: obj.ref.id };
	}
};

class QueryManager {
	constructor() {
		this.client = new faunadb.Client({
			secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET,
		});
	}

	async creatDoc(collection, data) {
		return this.client
			.query(
				q.Create(q.Collection(collection), {
					data: {
						...data,
						published: false,
						createdAt: q.ToString(q.Now()),
						updatedAt: q.ToString(q.Now()),
					},
				})
			)
			.then((res) => flattenData(res));
	}

	async getDoc(collection, id) {
		return this.client
			.query(q.Get(q.Ref(q.Collection(collection), id)))
			.then((res) => flattenData(res));
	}

	async getDocByIndexAndValue(index, value) {
		return this.client
			.query(q.Get(q.Match(q.Index(index), value)))
			.then((res) => flattenData(res));
	}

	async getIndex(index) {
		return this.client
			.query(q.Paginate(q.Match(q.Index(index))))
			.then((res) => flattenData(res));
	}

	// getdocs with options
	//   searchIndex(index, options = {}) {
	//     return this.client.query(
	//       q.Map(q.Paginate(q.Match(q.Index(index), ""), options))
	//     );
	//   }

	async updateDoc(id, collection, data) {
		return this.client
			.query(
				q.Update(q.Ref(q.Collection(collection), id), {
					data: { ...data, updatedAt: q.ToString(q.Now()) },
				})
			)
			.then((res) => flattenData(res));
	}

	async unpublishDoc(id, collection) {
		return this.client
			.query(
				q.Update(q.Ref(q.Collection(collection), id), {
					data: { published: false },
				})
			)
			.then((res) => flattenData(res));
	}

	async publishDoc(id, collection) {
		return this.client
			.query(
				q.Update(q.Ref(q.Collection(collection), id), {
					data: { published: true },
				})
			)
			.then((res) => flattenData(res));
	}

	async getAllDocs(collection, options = {}) {
		return this.client
			.query(
				q.Map(
					q.Paginate(q.Documents(q.Collection(collection)), options),
					q.Lambda("ref", q.Get(q.Var("ref")))
				)
			)
			.then((res) => flattenData(res));
	}
}

const faunaQueries = new QueryManager();
export default faunaQueries;
