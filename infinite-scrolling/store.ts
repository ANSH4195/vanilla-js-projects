type Item = { title: string; price: string; thumbnail: string };

let list: Item[] = [];
let total: number | undefined = undefined;

export const ITEMS_FETCHED = 'ITEMS_FETCHED';

export const dispatch = ({
	type,
	payload,
}: {
	type: string;
	payload: { products: Item[]; total: number };
}) => {
	switch (type) {
		case ITEMS_FETCHED:
			list = [...list, ...payload.products];
			total = payload.total;
			return;
		default:
			return;
	}
};

export const store = {
	list,
	total,
};
