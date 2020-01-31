console.log('%c HI', 'color: firebrick')
let breeds = []

document.addEventListener("DOMContentLoaded", () => {
    // helper function: change color of individual breed name
    function handleClick(e) {
        e.target.style.color = "red"
    }
    
    
    // Challenge 1
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        json['message'].forEach(function(imgURL) {
            const imgContainer = document.querySelector("#dog-image-container")
            const newImg = document.createElement("img")
            newImg.src = imgURL
            imgContainer.appendChild(newImg)
        })
    })

    // Challenge 2
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(r => r.json())
    .then(data => {
        // create an array of breed names
        breeds = Object.keys(data["message"])

        // for each breed name, append it to <li></li> 
        breeds.forEach(breed => {
            let ul = document.querySelector("#dog-breeds")
            let li = document.createElement("li")
            li.innerText = breed
            ul.appendChild(li)

            // Challenge 3: <li></li> color changes on click
            li.addEventListener("click", handleClick)

        })
        
    })

    // Challenge 4: select dropdown, update breedlist based on selection
    const dropDown = document.querySelector("#breed-dropdown")

    dropDown.addEventListener("change", handleDropDown)

    function handleDropDown(e) {
        const selectedChar = e.target.value
        filteredBreeds = breeds.filter(function(breed) {
            return breed.startsWith(selectedChar)
        })

        showDogs(filteredBreeds)
    }

    function showDogs(dogs) {
        let dogList = document.querySelector("#dog-breeds")
        // 1. clear the list
        dogList.innerHTML = ""
        /* algorithmic solution */
        // while (dogList.firstChild) {
        //     dogList.removeChild(dogList.firstChild)
        // }

        // 2. add new/filtered list
        dogs.forEach(function(dog) {
            let dogLi = document.createElement('li')
            dogLi.textContent = dog

            dogLi.addEventListener("click", handleClick)
            dogList.appendChild(dogLi)

        })
    }

})



