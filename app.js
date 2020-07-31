//grab all
const api_key = 'bd810772b236bd4d664463bc7fc86eac';
const base_url = 'https://api.themoviedb.org/3/';
const image_url = 'https://image.tmdb.org/t/p/w500/';
const search_button = document.querySelector(".searchmovie");
const movieinput = document.querySelector("#movienameinput");
const searchedmoviesdiv = document.querySelector(".searchedmovies")
const searchedmoviescontent = document.querySelector(".searchedmoviescontent");
const movieinfocontent = document.querySelector(".movieinfocontent");
const movieinfo = document.querySelector(".movieinfo");
const cross = document.querySelector(".cross");
const cross2 = document.querySelector(".cross2");
const cross3 = document.querySelector(".cross3");
const movieinfowrapper = document.querySelector(".movieinfowrapper");
const displaytrailer = document.querySelector(".displaytrailer");
const popularmoviescontent = document.querySelector(".popularmoviescontent");
const popularmovies = document.querySelector(".popularmovies");
const popularmovieinfowrapper = document.querySelector(".popularmovieinfowrapper");
const popularmovieinfocontent = document.querySelector(".popularmovieinfocontent");
const ratedmoviescontent = document.querySelector(".ratedmoviescontent");
const ratedmovies = document.querySelector(".ratedmovies");
const ratedmovieinfocontent = document.querySelector(".ratedmovieinfocontent");
const ratedmovieinfowrapper = document.querySelector(".ratedmovieinfowrapper");

//all event listeners

search_button.addEventListener("click", (e) => {
    movieinfowrapper.classList.add("none")
    e.preventDefault();
    searchmovie(movieinput.value);
});


document.addEventListener("click", clickevent)

cross.addEventListener("click", () => {
    console.log(cross.parentElement.previousElementSibling);
    movieinfowrapper.classList.add("none")
})
cross2.addEventListener("click", () => {
    console.log(cross.parentElement.previousElementSibling);
    popularmovieinfowrapper.classList.add("none")
})
cross3.addEventListener("click", () => {
    console.log(cross.parentElement.previousElementSibling);
    ratedmovieinfowrapper.classList.add("none")
})

document.addEventListener("DOMContentLoaded", displaypopularmovies);
document.addEventListener("DOMContentLoaded",displayratedmovies)
//all functions

//fn--- to search movie
function searchmovie(movieinputvalue) {
    if (movieinputvalue) {
        const main_url = 'search/movie';
        let search_url = `${base_url}${main_url}?api_key=${api_key}&query=${movieinputvalue}`;
        fetch(search_url)
            .then((res) => res.json())
            .then((data) =>
                renderposters(data))

    }

    //can handle better
    else {
        alert('enter valid input to search movie');
    }
}

//fn--- to render posters

function renderposters(data) {

    let results = data.results;
    let content = document.querySelector(".searchedmovies .content");
    searchedmoviescontent.innerHTML = '';
    content.innerHTML = '';
    let h2 = document.createElement("h2");
    let h5 = document.createElement("h5");

    h5.textContent = `scroll for all the results >>`
    h2.innerHTML = `Showing results for : " ${movieinput.value} "`;
    movieinput.value = '';
    content.appendChild(h2);
    content.appendChild(h5);

    if (results.length !== 0) {
        searchedmoviescontent.classList.remove("movienotfound")
        searchedmoviesdiv.prepend(content);
        results.map((poster) => {
            if (poster.poster_path) {
                displayposters(poster.poster_path, poster);
            }
        })
    }
    else {
        let div = document.createElement("div");
        div.innerHTML = `<div><h2><i class="fas fa-heart-broken"></i> NO MOVIE FOUND <i class="far fa-frown"></i></h2><div>`
        searchedmoviescontent.classList.add("movienotfound")
        searchedmoviescontent.appendChild(div);
    }
}


//fn--- to display posters


function displayposters(path, poster) {

    const main_url = `${image_url}${path}`;

    let div = document.createElement("div");
    let img = document.createElement("img");

    img.src = `${main_url}`;
    img.classList.add("poster")
    img.id = poster.id;
    div.appendChild(img);

    searchedmoviescontent.appendChild(div);
}

//fn--- clickevenet

function clickevent(e) {


    if (e.target.tagName.toLowerCase() === "img") {
        console.log(e.target.parentElement.parentElement.classList);
        if (e.target.parentElement.parentElement.classList[0] === "searchedmoviescontent") {
            rendervideos(e.target.id, movieinfocontent, movieinfowrapper);
        }
        else if (e.target.parentElement.parentElement.classList[0] === "popularmoviescontent")
        {
            console.log("1");
            
            rendervideos(e.target.id, popularmovieinfocontent, popularmovieinfowrapper);
        }
        else if (e.target.parentElement.parentElement.classList[0] === "ratedmoviescontent")
        {
            console.log("1");
            
            rendervideos(e.target.id, ratedmovieinfocontent, ratedmovieinfowrapper);
        }
    }


}


//fn---- to render videos

function rendervideos(movieid, b, c) {

    const main_url = `movie/${movieid}/videos`;
    let search_url = `${base_url}${main_url}?api_key=${api_key}`;

    fetch(search_url)
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
            b.innerHTML = '';
            let results = data.results;
            if (results) {
                if (results.length != 0) {
                    let length = (results.length > 2) ? 2 : results.length;
                    for (let i = 0; i < length; i++) {
                        displayvideos(results[i].key, data, b, c)
                    }

                }
                else {
                    c.classList.remove("none")
                    b.innerHTML = '';
                    b.classList.add("notrailerfound");
                    b.innerHTML = `<div><h2><i class="fas fa-heart-broken"></i> NO TRAILERS FOUND <i class="far fa-frown"></i></h2><div>`

                }

            }
            else {
                c.classList.remove("none")
                b.innerHTML = '';
                b.classList.add("notrailerfound");
                b.innerHTML = `<div><h2><i class="fas fa-heart-broken"></i> NO TRAILERS FOUND <i class="far fa-frown"></i></h2><div>`

            }

        })
}

//fn--- to display videos

function displayvideos(key, data, b, c) {


    c.classList.remove("none")
    b.classList.remove("notrailerfound");

    const div = document.createDocumentFragment();
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${key}`;

    iframe.allowFullscreen = true;

    b.appendChild(iframe);
}
//fn---  display popular movies

function displaypopularmovies() {
    const main_url = 'movie/popular';
    let search_url = `${base_url}${main_url}?api_key=${api_key}`;
    fetch(search_url)
        .then((res) => res.json())
        .then((data) =>
            renderpopularmovies(data))



}

//fn--- render popular movies


function renderpopularmovies(data) {
    let results = data.results;
    let content = document.querySelector(".popularmovies .content");
    popularmoviescontent.innerHTML = '';
    content.innerHTML = '';
    let h2 = document.createElement("h2");
    let h5 = document.createElement("h5");

    h5.textContent = `scroll for all the results >>`
    h2.innerHTML = `POPULAR MOVIES &nbsp;&nbsp;<i class="fas fa-fire-alt"></i>`;
    movieinput.value = '';
    content.appendChild(h2);
    content.appendChild(h5);

    if (results.length !== 0) {
        popularmoviescontent.classList.remove("movienotfound")
        popularmovies.prepend(content);
        results.map((poster) => {
            if (poster.poster_path) {
                displaypopularmovieposters(poster.poster_path, poster);
            }
        })
    }
    else {
        let div = document.createElement("div");
        div.innerHTML = `<div><h2><i class="fas fa-heart-broken"></i> NO MOVIE FOUND <i class="far fa-frown"></i></h2><div>`
        popularmoviescontent.classList.add("movienotfound")
        popularmoviescontent.appendChild(div);
    }
}
//fn--- to display POPULAR movie posters


function displaypopularmovieposters(path, poster) {

    const main_url = `${image_url}${path}`;

    let div = document.createElement("div");
    let img = document.createElement("img");

    img.src = `${main_url}`;
    img.classList.add("poster")
    img.id = poster.id;
    div.appendChild(img);

    popularmoviescontent.appendChild(div);
}
//new
//fn---  display rated movies

function displayratedmovies() {
    const main_url = 'movie/top_rated';
    let search_url = `${base_url}${main_url}?api_key=${api_key}`;
    fetch(search_url)
        .then((res) => res.json())
        .then((data) =>
            renderratedmovies(data))



}

//fn--- render rated movies


function renderratedmovies(data) {
    let results = data.results;
    let content = document.querySelector(".ratedmovies .content");
 
    ratedmoviescontent.innerHTML = '';
    content.innerHTML = '';
    let h2 = document.createElement("h2");
    let h5 = document.createElement("h5");

    h5.textContent = `scroll for all the results >>`
    h2.innerHTML = `RATED MOVIES &nbsp;&nbsp; <i class="fas fa-star"></i>`;
    movieinput.value = '';
    content.appendChild(h2);
    content.appendChild(h5);

    if (results.length !== 0) {
        ratedmoviescontent.classList.remove("movienotfound")
        ratedmovies.prepend(content);
        results.map((poster) => {
            if (poster.poster_path) {
                displayratedmovieposters(poster.poster_path, poster);
            }
        })
    }
    else {
        let div = document.createElement("div");
        div.innerHTML = `<div><h2><i class="fas fa-heart-broken"></i> NO MOVIE FOUND <i class="far fa-frown"></i></h2><div>`
        ratedmoviescontent.classList.add("movienotfound")
        ratedmoviescontent.appendChild(div);
    }
}
//fn--- to display RATED movie posters


function displayratedmovieposters(path, poster) {
   

    const main_url = `${image_url}${path}`;

    let div = document.createElement("div");
    let img = document.createElement("img");

    img.src = `${main_url}`;
    img.classList.add("poster")
    img.id = poster.id;
    div.appendChild(img);

    ratedmoviescontent.appendChild(div);
}

