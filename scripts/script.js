function loadCategories(){
    // 1. fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2. Covert promise to json
    .then(res => res.json())
    // 3. Send data to display
    .then(data => displayCategories(data.categories))
}

function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(response => response.json())
    .then(data => displayVideos(data.videos))
}

function displayCategories(categories){
    // Get the html container
    const categoriesContainer = document.getElementById("categories-container-btn");

    // Loop the categories
    for(let category of categories){
         // Create element
         const categoryDiv = document.createElement("div");

         categoryDiv.innerHTML = `
         <button class="btn hover:bg-[#FF1F3D] hover:text-white"> ${category.category} </button>
         `;

         categoriesContainer.append(categoryDiv);
    }
}

const displayVideos = (videos) =>{
    
    // loop through videos
    videos.forEach(video => {
        console.log(video)
    })
}

loadCategories()
loadVideos()