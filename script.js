let searchList = [ 'Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia' ];

const searchInput = document.getElementById('search');
const searchWrapper = document.getElementById('wrapper');
const resultWrapper = document.getElementById('result');

searchInput.addEventListener('keyup', (e) => {
    console.log('pressed');
    let results = [];
    let input = searchInput.value.trim();

    if(input.length){

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then(res=> res.json())
        .then(data => {
            if(data.meals){
                renderResults(data.meals);
            }else{
                console.log('No results');
                return searchWrapper.classList.remove('show');
            };
        })
    }else{
        searchWrapper.classList.remove('show');  
    }

});

resultWrapper.addEventListener('click',(e)=>{
    searchInput.value = e.target.innerText;
    searchWrapper.classList.remove('show');
})

function renderResults(results){

    let content = ''
    for(let key of results){
        content = content+`<li>${key.strMeal}</li>` ;
    }

    searchWrapper.classList.add('show');
    resultWrapper.innerHTML = `<ul>${content}</ul>`
}