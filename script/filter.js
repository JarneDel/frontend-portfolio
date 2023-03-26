import {a11yClick} from './accessibility.js';

const tagClicked = (e, item, ListOfFilters) => {
    ListOfFilters.forEach((filter) => {
        filter.classList.remove('u-selected');
    });
    item.classList.add('u-selected');
    // show the champions that have the tag
    document.querySelectorAll('.js-card-box').forEach((cardContainer) => {
        let card = cardContainer.firstElementChild;
        let tags = card.dataset.tags.split(',');
        // console.log(tags);
        if (tags.includes(item.dataset.tag) || item.dataset.tag === 'All') {
            cardContainer.classList.remove('u-hidden-3');
        } else {
            cardContainer.classList.add('u-hidden-3');
        }
    });
};

export function listenToTags(){
    const ListOfFilters = document.querySelectorAll('.js-filter-item');
    ListOfFilters.forEach((item) => {
        // two events for accessibility
        item.addEventListener("click", (e) => {
            tagClicked(e, item, ListOfFilters);
        });
        // so that the element is selectable with the keyboard
        item.addEventListener('keyup', (e) => {
            if (a11yClick(e)) {
                // console.log("a11y click");
                tagClicked(e, item, ListOfFilters);
            }
        });
    });
}


const hideSearchBar = () =>{
    document.querySelector('.c-filter__classes').classList.remove('u-hidden')
    document.querySelector('.js-search-close').classList.add('u-hidden')
    document.querySelector('#search-champion').classList.remove("active")
    document.querySelector('.c-search-champions').classList.remove("active")
    document.querySelector('.c-filter-by-class').classList.remove('active');


}

export const listenToSearchChampion = () => {
    const searchChampion = document.querySelector('.js-search-champion');
    if (searchChampion.value !== null){
        sortByChampion(searchChampion.value);
    }
    searchChampion.addEventListener('input', () => {
        const value = searchChampion.value.toLowerCase();
        sortByChampion(value);
    });
    document.querySelector('.js-search-icon').addEventListener('click',showSearchBar);
    window.onresize = () => {
       if (window.innerWidth > 576){
              hideSearchBar();
       }
    }
    document.querySelector('.js-search-close').onclick = function (){
        hideSearchBar();
        document.querySelector('.js-search-champion').value = ""
        sortByChampion("")
    }
};


const showSearchBar = ()=>{
    if (window.innerWidth < 576) {
        document.querySelector('.c-filter__classes').classList.add('u-hidden');
        document.querySelector('#search-champion').classList.add("active")
        document.querySelector('.c-search-champions').classList.add("active")
        document.querySelector('.js-search-close').classList.remove('u-hidden')
        document.querySelector('.c-filter-by-class').classList.add('active');
    }
}

const sortByChampion = (query) =>{
    query = query.trim().toLowerCase();
    const cards = document.querySelectorAll('.js-card-box');
    let count = 0;
    cards.forEach((card) => {
        const name = card.querySelector('.c-card__title').innerText.toLowerCase();
        if (name.includes(query)) {
            card.classList.remove('u-hidden-2');
            count +=1;
        } else {
            card.classList.add('u-hidden-2');
        }
    });
    if (count === 0){
        // show the no results message
        document.querySelector('.js-no-results').classList.remove('u-hidden');
    }else{
        // hide the no results message
        document.querySelector('.js-no-results').classList.add('u-hidden');
    }
}