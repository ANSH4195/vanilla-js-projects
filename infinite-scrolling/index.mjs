import { createProductCard, updateProductsList } from './domHelpers.mjs';
import { observer } from './infiniteScroll.mjs';
import { getStore, listProducts } from './service.mjs';
import { useDebouncedCallback } from './utils.mjs';

const PRODUCTS_PER_ROW = 4;
const getWindowSize = () => window.innerHeight;

listProducts({}).then(({ products }) =>
	requestAnimationFrame(() => {
		updateProductsList({ products });
		const domProducts = document.querySelectorAll('.product');
		observer.observe(domProducts[domProducts.length - 5]);
	})
);

const getProducts = () => document.querySelectorAll('.product');

const productsList = document.getElementById('products-wrapper');
const debouncedScrollHandler = useDebouncedCallback(() => {
	const scrollYPosition = productsList.scrollTop;
	const heightPerElement = getProducts()[0].offsetHeight;
	const visibleRows = {
		start: Math.floor(scrollYPosition / heightPerElement),
		end: Math.ceil((scrollYPosition + getWindowSize()) / heightPerElement),
	};
	const allProducts = getProducts();
	requestAnimationFrame(() => {
		for (let i = 0; i < visibleRows.start * PRODUCTS_PER_ROW; i++) {
			allProducts[i].classList.add(`h-[${heightPerElement}px]`);
			allProducts[i].innerHTML = '';
		}
	});
	requestAnimationFrame(() => {
		for (
			let i = visibleRows.start * PRODUCTS_PER_ROW;
			i < visibleRows.end * PRODUCTS_PER_ROW;
			i++
		) {
			allProducts[i].classList.remove(`h-[${heightPerElement}px]`);
			allProducts[i].innerHTML = createProductCard(
				getStore().products[i]
			).innerHTML;
		}
	});
	requestAnimationFrame(() => {
		for (
			let i = visibleRows.end * PRODUCTS_PER_ROW;
			i < allProducts.length;
			i++
		) {
			allProducts[i].classList.add(`h-[${heightPerElement}px]`);
			allProducts[i].innerHTML = '';
		}
	});
});

productsList.addEventListener('scroll', debouncedScrollHandler);
