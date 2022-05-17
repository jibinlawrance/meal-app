let searchList = [ 'Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia' ];

const searchInput = document.getElementById('search');
const searchWrapper = document.getElementById('wrapper');
const resultWrapper = document.getElementById('result');
const searchMeal = document.getElementById('search-meal');
const mealWrapper = document.querySelector('.meal-wrapper');
let resultUl;
let mealName;

searchInput.addEventListener('keyup', () => {
    let results = [];
    let input = searchInput.value.trim();
    mealName = '';
    mealWrapper.innerHTML = '';

    if(input.length){

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then(res=> res.json())
        .then(data => {
            if(data.meals){
                renderResults(data.meals);
            }else{
                // console.log('No results');
                resultWrapper.innerHTML = `<ul class="no-result-ul"><li>No results</li></ul>`
            };
        })
    }else{
        searchWrapper.classList.remove('show');  
    }

});

searchMeal.addEventListener('click', (e)=>{
    if(mealName){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(res=> res.json())
        .then(data=>{
            // console.log(data.meals[0]);
            mealWrapper.innerHTML = `<h2>${data.meals[0].strMeal}</h2> <img src="${data.meals[0].strMealThumb}" alt="">`
        })
    }
});

function addClickOnLi(resultUl){
    for(let i = 0; i < resultUl.children.length; i++){
        resultUl.children[i].addEventListener('click', (e)=>{
            searchInput.value = e.target.innerText;
            mealName = searchInput.value;
            searchWrapper.classList.remove('show');
        });
    }
}

function renderResults(results){

    let content = ''
    for(let key of results){
        content = content+`<li>${key.strMeal}</li>`;
    }

    searchWrapper.classList.add('show');
    resultWrapper.innerHTML = `<ul>${content}</ul>`

    resultUl = document.querySelector('#result ul')
    addClickOnLi(resultUl);
}