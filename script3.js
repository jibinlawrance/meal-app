const favUl = document.querySelector('.list-group');
let favMealList = [];
let storedFavList = window.localStorage.getItem('fav');

// check if there is array stored in local storage
if(storedFavList){
    favMealList = JSON.parse(storedFavList);

    for(let meal of favMealList){
        let li = document.createElement("li");
        li.innerText = meal;
        li.classList.add('list-group-item');
    
        favUl.appendChild(li);
    }

}else{
    let p = document.createElement('p');
    p.innerText = "No Favourite Meals Added!"
    favUl.insertBefore(p,null);
}