import { getProducts } from "./api.js"
const productsContainer = document.getElementById('productsContainer')

export async function render(products) {
    if (products.length === 0) {
        productsContainer.innerHTML = `<div><p class="firstline">No products found</p>
		<p class="secondline">Try changing your search or filters.</p></div>`
    } else {
        productsContainer.innerHTML = ''
        products.map((e) => {
            productsContainer.innerHTML += `
	<div class="product-card">
		<div> <img class="imgStyle" src="${e.thumbnail}"></div>
		<div class="productCategory">${e.category}</div>
		<div class="productTitle">${e.title}</div>
		<div class="productRating">${e.rating}. ${e.reviews.length} reviews</div>
		<div class="productPrice"> $ ${e.price}</div>
		</div>
		`
        })
    }
}

export async function init() {
    productsContainer.innerHTML = `<p> Loading Products... </p>`
    try {
        const productsData = await getProducts()
        render(productsData.products)
    } catch (error) {
        productsContainer.innerHTML = `Error fetching products. please try again later.
        <div><button id="retryBtn">Try again</button></div>`
        const retryBtn = document.getElementById('retryBtn')
        retryBtn.addEventListener('click', function() {
            init()
        })

    }
}

init()