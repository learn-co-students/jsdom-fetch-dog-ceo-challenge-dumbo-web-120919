
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function getImages() {
    fetch(imgUrl)
    .then (response => response.json())
    .then (json => addImagesForEach(json));
}

function addImagesForEach(json) {
    const dogs = document.querySelector("#dog-image-container")
    console.log(json)
    json.message.forEach(breed => {
        const img = document.createElement("img")
        img.src = breed
        dogs.appendChild(img)
    })
}

function getBreeds() {
    fetch(breedUrl)
    .then (response => response.json())
    .then (json => addBreedsForEach(json));
}

function addBreedsForEach(json) {
    const breeds = document.querySelector("#dog-breeds")
    Object.keys(json.message).forEach(breed => {
        const li = document.createElement("li")
        li.innerText = breed
        breeds.appendChild(li)
        li.addEventListener("click", function(){
            li.style.color = "blue";
        })
    })
}

function filterBreeds() {
    const breeds = document.querySelector("#dog-breeds")
    const search = document.querySelector("#breed-dropdown")
    
    search.addEventListener("input", event => {
        const userInput = event.target.value

        breeds.querySelectorAll("li").forEach(li => {
            if (li.textContent.startsWith(userInput)) {
                li.style.display = "block"
            } else {
                li.style.display = "none"
            }
        })
    })
}

      

document.addEventListener('DOMContentLoaded', function() {
    getImages()
    getBreeds()
    filterBreeds()
    
  })