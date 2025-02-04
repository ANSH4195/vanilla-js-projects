const PAGE_SIZE = 15;
let currentSkip = 0;

const store = {
	products: [],
	total: 0,
};

export const getStore = () => store;

export const listProducts = async ({
	pageSize = PAGE_SIZE,
	skip = currentSkip,
}) => {
	const data = await fetch(
		`https://dummyjson.com/products?limit=${pageSize}&skip=${skip}&select=title,price,thumbnail&delay=500`
	);
	const { products, total } = await data.json();
	store.products = products;
	store.total = total;
	return { products, total };
};

export const fetchNextPage = async ({ pageSize = PAGE_SIZE }) => {
	currentSkip = currentSkip + PAGE_SIZE;
	const data = await fetch(
		`https://dummyjson.com/products?limit=${pageSize}&skip=${currentSkip}&select=title,price,thumbnail&delay=500`
	);
	const { products, total } = await data.json();
	store.products = [...store.products, ...products];
	store.total = total;
	return { products, total };
};
