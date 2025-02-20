import { createProductCard, updateProductsList } from "./domHelpers.mjs";
import { observer } from "./infiniteScroll.mjs";
import { getStore, listProducts } from "./service.mjs";
import { useDebouncedCallback } from "./utils.mjs";

const PRODUCTS_PER_ROW = 4;
const productWrapperSelector = document.getElementById("products-wrapper");
const getWindowSize = () => window.innerHeight;
const getProducts = () => document.querySelectorAll(".product");

listProducts({}).then(({ products }) =>
	requestAnimationFrame(() => {
		updateProductsList({ products });
		const productList = productWrapperSelector.children;
		observer.observe(productList[productList.length - 5]);
	}),
);

const debouncedScrollHandler = useDebouncedCallback(() => {
	const scrollYPosition = productWrapperSelector.scrollTop;
	const heightPerElement = getProducts()[0].offsetHeight;
	const visibleRows = {
		start: Math.floor(scrollYPosition / heightPerElement),
		end: Math.ceil((scrollYPosition + getWindowSize()) / heightPerElement),
	};
	const allProducts = getProducts();
	requestAnimationFrame(() => {
		for (let i = 0; i < visibleRows.start * PRODUCTS_PER_ROW; i++) {
			allProducts[i].classList.add(`h-[${heightPerElement}px]`);
			allProducts[i].innerHTML = "";
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
				getStore().products[i],
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
			allProducts[i].innerHTML = "";
		}
	});
});

productWrapperSelector.addEventListener("scroll", debouncedScrollHandler);
