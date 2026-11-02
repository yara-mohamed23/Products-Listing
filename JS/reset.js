import { myBox } from "./state.js"
import { init } from "./rendering.js"
const resetBtn = document.getElementById('resetBtn')

export function reset() {
    myBox.searchWord = '';
    myBox.categoryType = '';
    const searchInput = document.getElementById('searchInput')
    const categoryInput = document.getElementById('categoryInput')
    searchInput.value = '';
    categoryInput.value = '';
    init();
}

resetBtn.addEventListener('click', function() {
    reset()
})