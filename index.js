const myAPIkey = "d09d991";
let myStorage = JSON.parse(localStorage.getItem('id'));

const searchForm = document.getElementById("search-form");
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("submit-btn");
const movieDiv = document.getElementById("movies-div");

async function searchForMovies(){
    let text = searchField.value;
    const response = await fetch(`http://www.omdbapi.com/?apikey=${myAPIkey}&s=${text}`);
    const data = await response.json();
    movieDiv.innerHTML = ``;
    
    if(data.Search){
        for(let i=0; i<data.Search.length; i++){
            const res = await fetch(`http://www.omdbapi.com/?apikey=${myAPIkey}&i=${data.Search[i].imdbID}`);
            const movieData = await res.json();
            
            const {Title, Plot, Genre, Poster, Metascore, Runtime, imdbID, Type} = movieData;

            if(Type !== "movie" && Type !== "series"){
                continue;
            }

            let html = `
                <div class="movie-card">
                    <img class="movie-poster" src="${Poster === "N/A" ? "images/placeholder.png" : Poster}">
                    <div class="movie-bio">
                        <div class="title-and-rating">
                            <h3>${Title}</h3>
                            <p class="rating"><span class="material-symbols-outlined" style="color: yellow;">star</span>${(Metascore/10).toFixed(1)}</p>
                        </div>
                        <div class="info">
                            <p class="runtime">${Runtime}</p>
                            <p class="genre">${Genre}</p>
                            <a onclick="setStorage(this.id)" id="${imdbID}" class="add-to-watchlist"><span class="material-symbols-outlined">add_circle</span>Watchlist</a>
                        </div>
                        <p class="description">${Plot}</p>
                    </div>
                </div>
            `
            movieDiv.innerHTML += html;
        }
    } else {
        movieDiv.innerHTML = `
            <span id="movie-icon" class="material-symbols-outlined">search_off</span>
            <p>Unable to find what you are looking for.<br>Please try another search.</p>
        `
    }

}

function setStorage(id){
    for(let item of myStorage){
        if(item == id){
            return;
        }
    }
    myStorage.push(id);
    localStorage.clear;
    localStorage.setItem('id', JSON.stringify(myStorage));
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchForMovies();
});