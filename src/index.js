console.log('%c HI', 'color: firebrick')

/* JSON fetch functions */
let breeds = [];
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function getImages() {
  return fetch(imgUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    postImages(json);
  });
};

function getBreeds() {
  return fetch(breedUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    postBreeds(json);
  });
};

/* post content functions */

const dogImgContainer = document.querySelector("#dog-image-container");
const dogList = document.querySelector("#dog-breeds");
const breedDropdown = document.querySelector("#breed-dropdown")

function postImages(json) {
  json.message.forEach(function(element) {
    dogImgElement = document.createElement('img')
    dogImgElement.src = element
    dogImgContainer.append(dogImgElement)
  });
};

function dogClicker(event) {
  event.target.style.color = getRandomColor()
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function postBreeds(json) {
  breeds = Object.keys(json.message)
  breeds.forEach(function(breed) {
    dogLi = document.createElement('li');
    dogLi.textContent = breed;
    dogLi.addEventListener("click", dogClicker)
    // while (dogList.firstChild) {
    //   dogList.removeChild(dogList.firstChild)
    // }
    dogList.append(dogLi);
  });
};

getImages()
getBreeds()

/* listeners */

breedDropdown.addEventListener("change", handleDropdown)

function handleDropdown(event) {
  const firstLetter = event.target.value;
  
  filteredBreeds = breeds.filter(function(breed) {
    return breed.startsWith(firstLetter);
  });
  renderDogs(filteredBreeds);
}

function renderDogs(dogs) {
  while (dogList.firstChild) {
    dogList.removeChild(dogList.firstChild)
  }
  dogs.forEach(function(dog) {
    dogLi = document.createElement('li');
    dogLi.textContent = dog;
    dogLi.addEventListener("click", dogClicker)
    dogList.append(dogLi);
  });
}