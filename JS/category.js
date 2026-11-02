import { getCategories, getCategoryName, getProducts } from "./api.js"
import { render } from "./rendering.js"
import { myBox } from "./state.js"

const categoryInput = document.getElementById('categoryInput')
const productsContainer = document.getElementById('productsContainer')
const categoryError = document.getElementById('categoryError')


async function allCategories() {
    try {
        const categoryData = await getCategories()
        console.log(categoryData)
        categoryData.map((e) => {
            categoryInput.innerHTML += `<option value=${e.slug}>${e.name}</option>`
        })
    } catch (error) {
        categoryError.innerHTML = `Error fetching categories. please try again later.`
    }

    return
}

allCategories()

categoryInput.addEventListener('change', async function(e) {
    console.log(e.target.value)

    // 1. زودي السطر ده عشان يحدث الـ state
    myBox.categoryType = e.target.value;
    console.log("Updated State:", myBox);
    let result = [];

    productsContainer.innerHTML = `<p> Loading Products... </p>`

    try {
        if (e.target.value) {
            const categoryName = await getCategoryName(myBox.categoryType)
            result = categoryName.products;
        } else {
            const productData = await getProducts()
            result = productData.products;
        }

        // 2. لو فيه كلمة بحث مكتوبة، فلتر النتائج كمان بيها!
        if (myBox.searchWord) {
            const query = myBox.searchWord.toLowerCase();
            result = result.filter(item => item.title.toLowerCase().includes(query));
        }
        // 3. العرض
        render(result);
    } catch (error) {
        productsContainer.innerHTML = `Error fetching products. please try again later.`
    }

    //before refactor try & catch
    //     const categoryName = await getCategoryName(myBox.categoryType)
    //     result = categoryName.products;
    // } else {
    //     const productData = await getProducts()
    //     result = productData.products;
    // }

    // // 2. لو فيه كلمة بحث مكتوبة، فلتر النتائج كمان بيها!
    // if (myBox.searchWord) {
    //     const query = myBox.searchWord.toLowerCase();
    //     result = result.filter(item => item.title.toLowerCase().includes(query));
    // }

    // 3. العرض
    //render(result);
})