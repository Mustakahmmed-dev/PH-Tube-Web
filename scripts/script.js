// Remove active class
function removeActiveClass(){
    const activeButtons = document.getElementsByClassName("active");
    for(let activeBtn of activeButtons){
        activeBtn.classList.remove("active");
    }
}


function loadCategories(){
    // 1. fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2. Covert promise to json
    .then(res => res.json())
    // 3. Send data to display
    .then(data => displayCategories(data.categories))
}

function loadVideos(searchTerm = ""){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos);
    })
}

const loadVideosByCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        const clickedButtons = document.getElementById(`btn-${id}`);
        clickedButtons.classList.add("active");

        displayVideos(data.category);
    })
}


const loadVideoDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayVideoDetails(data.video))
}


const displayVideoDetails = (video) => {
    console.log(video)
    document.getElementById("video_details").showModal();

    const videoDetailContents = document.getElementById("video-detail-contents");
    videoDetailContents.innerHTML = `
            <div class="card bg-base-100 image-full shadow-sm">
                <figure>
                    <img class="object-cover"
                    src="${video.thumbnail}"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${video.title}</h2>
                    <p>${video.description}</p>
                    <span class="text-gray-400"> ${video.others.views} </span>
                </div>
        </div>
    `;
}

function displayCategories(categories){
    // Get the html container
    const categoriesContainer = document.getElementById("categories-container-btn");

    // Loop the categories
    for(let category of categories){
        // Create element
         const categoryDiv = document.createElement("div");

         categoryDiv.innerHTML = `
         <button id="btn-${category.category_id}" onclick="loadVideosByCategory(${category.category_id})" class="btn hover:bg-[#FF1F3D] hover:text-white"> ${category.category} </button>
         `;

         categoriesContainer.append(categoryDiv);
    }
}

/*
{
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}
*/

const displayVideos = (videos) =>{
    const videosContainer = document.getElementById("videos-container");
        videosContainer.innerHTML = "";

        if(videos.length == 0){
            videosContainer.innerHTML = `
            <div class="col-span-full text-center space-y-2 mt-5">
                <img class="inline" src="images/Icon.png" alt="Error photo">
                <h3 class="text-2xl">Oops! There's no content available here.</h3>
             </div>
            `;
            return;
        }

    // loop through videos
    videos.forEach(video => {
        // console.log(video)
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
          <div class="card shadow-sm">
                <figure class="relative">
                    <img class="w-full h-[180px] object-cover" src="${video.thumbnail}"
                        alt="Play video" />
                    <span class="absolute bottom-3 right-3 bg-black rounded px-2 text-white">3hrs 56 min ago</span>
                </figure>

                <div class="flex gap-3 py-4">
                    <div class="profile">
                        <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                        </div>
                    </div>

                    <div>
                        <h2 class="text-2xl">${video.title}</h2>
                        <p class="text-gray-400 flex gap-2">${video.authors[0].profile_name} ${video.authors[0].verified == true ? `<img class="w-6 h-6" src="./images/verified.png" alt="">` : ``} </p>
                        <p class="text-gray-400"> ${video.others.views} </p>
                    </div>
                </div>

                <button onclick="loadVideoDetails('${video.video_id}')"
                class="btn btn-block"> Show Details </button>
            </div>
        `;
        
        videosContainer.append(videoCard);
    })
}

// Search buton
document.getElementById("search-input").addEventListener("keyup", (e) => {
    const value = e.target.value;
    loadVideos(value);

})


loadCategories()
loadVideos();

