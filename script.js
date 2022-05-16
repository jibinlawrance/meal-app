let searchList = [ 'Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia' ];

const searchInput = document.getElementById('search');
const searchWrapper = document.getElementById('wrapper');
const resultWrapper = document.getElementById('result');

searchInput.addEventListener('keyup', (e) => {
    let results = [];
    let input = searchInput.value;
    let trimInput = input.trim();

    if(trimInput){
        console.log(input);
    }
});