const favUl = document.querySelector('.list-group');
let favMealList = [];
let storedFavList = window.localStorage.getItem('fav');

// check if there is array stored in local storage
if(storedFavList){
    favMealList = JSON.parse(storedFavList);

    for(let meal of favMealList){
        let li = document.createElement("li");
        li.innerHTML = `<span>${meal.mealName}</span> <i id="${meal.mealId}" class="fa fa-trash-alt delete-icon"></i>`;
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

function removeMeal(mealId){
    favMealList = favMealList.filter(function(e){
        return e.mealId != mealId;
    })

    if(favMealList.length > 0){
        // update local storage
        window.localStorage.setItem('fav', JSON.stringify(favMealList));
    }else{
        window.localStorage.removeItem('fav')
    }
}