import { updateProductsList } from "./domHelpers.mjs";
import { fetchNextPage } from "./service.mjs";

const handleSentinelTrigger = (entries, observer) => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			observer.unobserve(entry.target);
			fetchNextPage({}).then(({ products }) =>
				requestAnimationFrame(() => {
					updateProductsList({ products });
					const productsList =
						document.getElementById("products-wrapper").children;
					observer.observe(productsList[productsList.length - 5]);
				}),
			);
		}
	}
};

export const observer = new IntersectionObserver(handleSentinelTrigger, {
	rootMargin: "20px",
	threshold: 0.5,
});
