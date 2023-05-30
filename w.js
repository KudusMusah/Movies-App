// const API_KEY = "cf21fa311a21ccd53b021d9bc173cbcb"
const URL = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=cf21fa311a21ccd53b021d9bc173cbcb"
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=cf21fa311a21ccd53b021d9bc173cbcb&query="'
const IMG_PATH = "https://image.tmdb.org/t/p/w500"
const GENRE_URL = "https://api.themoviedb.org/3/discover/movie?api_key=cf21fa311a21ccd53b021d9bc173cbcb&with_genres="

const main = document.querySelector(".main")
const form = document.querySelector(".form")
const search = document.querySelector(".search")
const leftBtn = document.getElementById("leftBtn")
const rightBtn = document.getElementById("rightBtn")
const genres = document.querySelectorAll(".genre")

let currentPage = 1
let currentUrl = URL


genres.forEach(genre => {
    genre.addEventListener('click', () => {
        removeAllHighlights()
        highlight_genre(genre)
        genre_id = genre.getAttribute('id')

        if (Number(genre_id == 0)) {
            fetch_data(URL)
        } else {
            url = `${GENRE_URL}${genre_id}`
            fetch_data(url)
        }
    })
})


leftBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--
    }
    let final_url = `${currentUrl}&page=${currentPage} `
    fetch_data(final_url)
})

rightBtn.addEventListener('click', () => {
    if (currentPage < 1000) {
        currentPage++
    }
    let final_url = `${currentUrl}&page=${currentPage} `
    fetch_data(final_url)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (search.value.trim() === "") {
        window.location.reload()
    } else {
        const search_term = SEARCH_URL + search.value
        fetch_data(search_term)
    }
})

fetch_data(URL)

async function fetch_data(url) {
    const res = await fetch(url)
    const data = await res.json()
    currentUrl = url
    updateDom(data.results)
}

function updateDom(data) {
    main.innerHTML = ""
    data.forEach(element => {
        let box = document.createElement('div')
        box.classList.add("movie-box")
        box.innerHTML = `
        <div class="movie">
            <div class="img">
                <img src="${IMG_PATH + element.poster_path}" alt="${element.title}">
            </div>
            <div class="rating">
                <h3>${element.title}</h3>
                <span class="${rating_class(element.vote_average)}">${element.vote_average.toFixed(1)}</span>
            </div>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>
                ${element.overview}
            </p>
        </div>`

        main.appendChild(box)
    });
}

function rating_class(rate) {
    if (rate >= 8) {
        return "green"
    } else if (rate >= 5) {
        return "orange"
    } else {
        return "red"
    }
}


function highlight_genre(genre) {
    genre.classList.add('highlight')
}

function removeAllHighlights() {
    genres.forEach(genre => {
        genre.classList.remove('highlight')
    })
}