const favUl = document.querySelector('.list-group');
let favMealList = [];
// store the string from the local storage
let storedFavList = window.localStorage.getItem('fav');

updateMealsList(storedFavList);

function updateMealsList(){

    favUl.innerHTML = '';

    // check if there is array stored in local storage
    if(storedFavList){
        favMealList = JSON.parse(storedFavList);

        for(let meal of favMealList){
            let li = document.createElement("li");
            li.innerHTML = `<a href="./meal-detail-page.html?${meal.mealId}" class="text-decoration-none">${meal.mealName}</a> <i id="${meal.mealId}" class="fa fa-trash-alt delete-icon"></i>`;
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        
            favUl.appendChild(li);

            // add click event on delete icon
            document.getElementById(meal.mealId).addEventListener('click', (e)=>{
                let mealId = e.target.getAttribute("id"); 
                removeMeal(mealId);
            });
        }

    }else{
        let p = document.createElement('p');
        p.innerText = "No Favourite Meals Added!"
        favUl.insertBefore(p,null);
    }
}

function removeMeal(mealId){
    
    // filter out the meal which needs to be deleted
    favMealList = favMealList.filter(function(e){
        return e.mealId != mealId;
    })

    if(favMealList.length > 0){
        // update local storage with the new updated array
        window.localStorage.setItem('fav', JSON.stringify(favMealList));
        storedFavList = window.localStorage.getItem('fav');
        updateMealsList(storedFavList);
    }else{
        // remove the array from the local storage on deleting the last element from the array
        window.localStorage.removeItem('fav')
        storedFavList = window.localStorage.getItem('fav');
        updateMealsList(storedFavList);
    }
}