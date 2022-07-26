const myAPIkey = "d09d991";

const movieDiv = document.getElementById("movies-div");

let myList = JSON.parse(localStorage.getItem('id'));

function displayWatchlist(){
    if(myList && myList.length > 0){
        movieDiv.innerHTML = ``;
        for(let item of myList){
            fetch(`https://www.omdbapi.com/?apikey=${myAPIkey}&i=${item}`)
                .then(res => res.json())
                .then(data => {

                    let {Poster, Title, Runtime, Genre, imdbID, Plot, Metascore} = data;

                    movieDiv.innerHTML += `
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
                                    <a onclick="removeFromStorage(this.id)" id="${imdbID}" class="add-to-watchlist"><span class="material-symbols-outlined">do_not_disturb_on</span>Remove</a>
                                </div>
                                <p class="description">${Plot}</p>
                            </div>
                        </div>
                    `
                });
        }
    }

    else {
        movieDiv.innerHTML = `
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html"><span class="material-symbols-outlined">add_circle</span>Let's add some movies!</a>
        `
    }
}

displayWatchlist();

function removeFromStorage(id){
    myList.splice(myList.indexOf(id), 1);
    console.log(myList)
    localStorage.clear;
    localStorage.setItem('id', JSON.stringify(myList));
    displayWatchlist();
}