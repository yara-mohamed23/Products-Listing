import { getSearch } from "./api.js"
import { render } from "./rendering.js"
import { myBox } from "./state.js"

const searchInput = document.getElementById('searchInput')
const productsContainer = document.getElementById('productsContainer')
let timerId;

// function onType(){
// 	clearTimeout(timerId);
// 	timerId = setTimeout(function(){
// 		console.log("نفذت بعد ما المستخدم بطل يكتب")
// 	},400)
// }

searchInput.addEventListener('input', function(e) {
    clearTimeout(timerId);
    timerId = setTimeout(async function() {
        myBox.searchWord = e.target.value;
        console.log("Updated State:", myBox);

        try {
            productsContainer.innerHTML = `<p> Loading Products... </p>`
            const searchData = await getSearch(myBox.searchWord)
            let result = searchData.products; // عرفنا result هنا بـ let

            // 2. لو فيه كاتيجوري متحدد في myBox.. فلتر النتيجة بالكاتيجوري ده
            if (myBox.categoryType) {
                result = result.filter(item => item.category === myBox.categoryType);
            }

            // 3. اعرض الناتج
            render(result);
        } catch (error) {
            productsContainer.innerHTML = `Error fetching products. please try again later.`
        }
    }, 400)
})