const searchInput = document.getElementById('search');
const searchWrapper = document.getElementById('search-wrapper');
const resultWrapper = document.getElementById('result');
const mealWrapper = document.querySelector('.meal-wrapper');

let resultUl;
let mealName;
let favMealList;

// local storage string
let storedFavList = window.localStorage.getItem('fav');

// check if there is array stored in local storage
if(storedFavList){
    // add local storage string to the variable as an array
    favMealList = JSON.parse(storedFavList);
}else{
    favMealList = [];
}

// add event listener on the search bar
searchInput.addEventListener('keyup', () => {
    let input = searchInput.value.trim();
    mealName = '';
    mealWrapper.innerHTML = '';

    if(input.length){

        // fetch the meal details based to the input value
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then(res=> res.json())
        .then(data => {
            if(data.meals){
                // if data is there then call the renderResults function
                renderResults(data.meals);
            }else{
                // if data is empty then tell the user about it
                resultWrapper.innerHTML = `<ul class="no-result-ul"><li>No results</li></ul>`
            };
        })
    }else{
        searchWrapper.classList.remove('show');  
    }

});


function addFav(favBtn){
    // store the meal name in a variable
    let mealName = favBtn.getAttribute("data-meal-name");
    // store the meal id in a variable
    let mealId = favBtn.getAttribute("id");
    
    // check if the favorite meals list array is empty
    if(favMealList.length == 0){
        // create an object which will contain the meal name and meal id
        let meal = { "mealName": `${mealName}` , "mealId": `${mealId}` }
        // add the object to the array
        favMealList.push(meal);
    
        // Add to local storage
        window.localStorage.setItem('fav', JSON.stringify(favMealList));

        // disable the "Add to favourites" button so that the user doesn't click again
        favBtn.disabled = true;
        // tell the user that the meal is added to favourites
        alert('Added to Favourites!');

    }else{
        let containsName = false;
        // check whether the meal is already added to the list
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
            
            alert('Added to Favourites!');
        };
    }
}

function displayMeal(){
    // fetch the meal details specific to the meal name
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(res=> res.json())
    .then(data=>{
            
        mealWrapper.innerHTML = `<div class="card my-3 mx-auto" style="max-width: 22rem;">
            <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h4 class="card-title mb-0">${data.meals[0].strMeal}</h4>
            </div>
            <div class="card-body border-top">
              <button onclick="addFav(this)" class="btn btn-primary fav-btn mb-2 mb-sm-0" data-meal-name="${data.meals[0].strMeal}" id="${data.meals[0].idMeal}">Add to favourites</button>
              <a href="./meal-detail-page.html?${data.meals[0].idMeal}" class="btn btn-primary text-decoration-none mb-2 mb-sm-0">View Recipe</a>
            </div>
        </div>`
    });
}

function addClickOnLi(resultUl){
    // add click event on all the list item 
    for(let i = 0; i < resultUl.children.length; i++){
        resultUl.children[i].addEventListener('click', (e)=>{
            // on clicking the list item display the meal on the search input 
            searchInput.value = e.target.innerText;
            // update the meal name variable with the valid meal name
            mealName = searchInput.value;
            searchWrapper.classList.remove('show');

            displayMeal();
        });
    }
}

function renderResults(results){

    let content = ''

    // iterate through each of the elements
    for(let key of results){
        // add each of the meal name
        content = content+`<li>${key.strMeal}</li>`;
    }

    // display the wrapper which will contain the list 
    searchWrapper.classList.add('show');
    // add the meal name list to the dom
    resultWrapper.innerHTML = `<ul>${content}</ul>`

    resultUl = document.querySelector('#result ul')
    // call the function to add click event on each list item
    addClickOnLi(resultUl);
}