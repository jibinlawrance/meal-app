// store the querystring from the url in a variable
var queryString = location.search.substring(1);

// fetch the meal details using the query
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${queryString}`)
.then(res=> res.json())
.then(data => { addMealDetails(data.meals[0]) })

// display the meal details on the dom
function addMealDetails(meal){
    const mealDetails = document.getElementById('meal-details');
    mealDetails.innerHTML = `<div class="row my-5">
    <div class="col-sm-4 mb-4">
        <img src="${meal.strMealThumb}" class="img-thumbnail" alt="">
    </div>
    <div class="col-sm-8">
        <h1>${meal.strMeal}</h1>
        <h5 class="lh-base">${meal.strInstructions}</h5>
    </div>
    </div> `;

}
