const productsWrapper = document.getElementById('products-wrapper');

const createProductThumbnail = ({ imageURL, title }) => {
	const image = document.createElement('img');
	image.setAttribute('loading', 'lazy');
	image.src = imageURL;
	image.alt = title;
	return image;
};

export const createProductCard = ({ thumbnail, title, price }) => {
	const productCard = document.createElement('div');
	productCard.classList.add(
		'product',
		'p-4',
		'border',
		'border-gray-700',
		'rounded-2xl',
		'text-wrap'
	);
	productCard.append(
		createProductThumbnail({ imageURL: thumbnail, title: title }),
		title,
		document.createElement('br'),
		price
	);
	productCard.setAttribute('data-identifier', title);
	return productCard;
};

const createProductCardsFragment = ({ products }) => {
	const productCardsFragment = document.createDocumentFragment();
	for (const product of products) {
		productCardsFragment.append(createProductCard(product));
	}
	return productCardsFragment;
};

export const updateProductsList = ({ products }) => {
	productsWrapper.append(createProductCardsFragment({ products }));
};
