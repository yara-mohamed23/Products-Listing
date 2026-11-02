export const baseURL = 'https://dummyjson.com'
export const products = '/products'
export const categories = '/products/categories'
export function search(query) {
    return `/products/search?q=${query}`
}
export function category(categoryName) {
    return `/products/category/${categoryName}`
}