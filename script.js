const searchInput = document.getElementById('search');
const searchWrapper = document.getElementById('search-wrapper');
const resultWrapper = document.getElementById('result');
const searchMeal = document.getElementById('search-meal');
const mealWrapper = document.querySelector('.meal-wrapper');
let resultUl;
let mealName;
let favMealList;
let storedFavList = window.localStorage.getItem('fav');

// check if there is array stored in local storage
if(storedFavList){
    favMealList = JSON.parse(storedFavList);
}else{
    favMealList = [];
}

searchInput.addEventListener('keyup', () => {
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
            mealWrapper.innerHTML = `<div class="card my-3" style="width: 22rem;">
                <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h4 class="card-title mb-0">${data.meals[0].strMeal}</h4>
                </div>
                <div class="card-body border-top">
                  <button onclick="addFav(this)" class="btn btn-primary fav-btn" data-meal-name="${data.meals[0].strMeal}" id="${data.meals[0].idMeal}">Add to favourites</button>
                  <a href="./meal-detail-page.html?${data.meals[0].idMeal}" class="btn btn-primary text-decoration-none">View Recipe</a>
                </div>
            </div>`
        })
    }
});

function addFav(favBtn){
    let mealName = favBtn.getAttribute("data-meal-name");
    let mealId = favBtn.getAttribute("id");
    if(favMealList.length == 0){
        let meal = { "mealName": `${mealName}` , "mealId": `${mealId}` }
        favMealList.push(meal);
    
        // Add to local storage
        window.localStorage.setItem('fav', JSON.stringify(favMealList));

        favBtn.disabled = true;

    }else{
        let containsName = false;
        for(let i=0; i < favMealList.length; i++){
            if(favMealList[i].mealName === mealName){
                containsName = true;
                alert('Already Added!');
                break;
            }
        }
        if(!containsName){
            let meal = { "mealName": `${mealName}` , "mealId": `${mealId}` }
            favMealList.push(meal);

            // Add to local storage
            window.localStorage.setItem('fav', JSON.stringify(favMealList));
            
            favBtn.disabled = true;         
        };
    }
}

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