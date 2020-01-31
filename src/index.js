//add below to load dom and then load functions
document.addEventListener('DOMContentloaded', function (){
    loadImages(); // this is the function created below, outside of the event listener
})

// ## Challenge 1
// This repository includes an `index.html` file that loads an `index.js` file.
// Add JavaScript so that:
// - on page load
// - fetch the images using the url above ⬆️
// - parse the response as `JSON`
function loadImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(res => res.json())
        .then(results => {
        results.message.forEach(image => addImage(image))
        });
}
// - add image elements to the DOM **for each**🤔 image in the array
function addImage(dogPicUrl){
    let container = document.querySelector('#dog-image-container'); //finding the container
    let newImageEl = document.createElement('img'); //creating a new element to store new imgs
    newImageEl.src = dogPicUrl;
    container.appendChild(newImageEl);

}

function loadBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
      .then(res => res.json())
      .then(results => {
        breeds = Object.keys(results.message);
        updateBreedList(breeds);
        addBreedSelectListener();
      });
}
  
function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
}

function updateColor(event) {
    event.target.style.color = 'palevioletred';
}



