import { baseURL, products, categories, search, category } from "./endpoints.js"

export async function getProducts() {
    const response = await fetch(baseURL + products)
    const productsDate = await response.json()
    console.log(productsDate)
    return productsDate
}
console.log(getProducts()) //Promise {<pending>}

async function allProducts() {
    const result = await getProducts()
    console.log(result)
}
allProducts() //{products: Array(30), total: 194, skip: 0, limit: 30}

//categories
export async function getCategories() {
    const response = await fetch(baseURL + categories)
    const categoriesDate = await response.json()
    return categoriesDate
}

async function allCategories() {
    const result = await getCategories()
    console.log(result)
}
allCategories()

//search
export async function getSearch(query) {
    const response = await fetch(baseURL + search(query))
    const searchData = await response.json()
    return searchData
}
console.log(getSearch('phone'))

async function searches(query) {
    const result = await getSearch(query)
    console.log(result)
}
console.log(searches('phone'))

//categoryName
export async function getCategoryName(query) {
    const response = await fetch(baseURL + category(query))
    const categoryNameData = await response.json()
    return categoryNameData
}
async function CategoryName(query) {
    const result = await getCategoryName(query)
    console.log(result)
}
// console.log(CategoryName('Beauty'))
// console.log(CategoryName('beauty'))