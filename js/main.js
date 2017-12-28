import { changeHash } from '../app'
import request from './request'
console.log(changeHash);

let apiScript;
let response;
let currentFilmList;
let yearFrom;
let yearTo;
let filterByYearBtn;
let listMovies = document.querySelector('.container');
let sortByNameBtn = document.querySelector('.sortByName');
let search = document.querySelector('#search');
let goHomeBtn = document.querySelector('.goHome');

let filmInTheater = document.querySelector('.inTheaters');

search.addEventListener('keyup', searchByName);
sortByNameBtn.addEventListener('click', sortByName);
filmInTheater.addEventListener('click', getFilmsInTheaters);
goHomeBtn.addEventListener('click', goHome);

function mainJs () {
     let url = `http://www.myapifilms.com/imdb/top?token=5d0d20e7-5767-403f-b7a0-d070e43c8bba&format=json&data=0`;
    request(url, processFilms);
}

function searchByName() {
    listMovies.innerHTML = '';
    let tempArray = currentFilmList;
    tempArray = tempArray.filter((film) => {
        return film.title.toUpperCase().indexOf(this.value.toUpperCase()) === 0;
    });
    renderList(tempArray);
}

function filterByYear() {
    listMovies.innerHTML = '';
    let tempArray = currentFilmList;
    tempArray = tempArray.filter((film) => {
        return film.year >= yearFrom.value && film.year <= yearTo.value;
    });
    renderList(tempArray);
}

function sortByName() {
    listMovies.innerHTML = '';
    let tempArray = currentFilmList;
    tempArray.sort((a, b) => {
        return a.title > b.title ? 1 : -1;
    });
    renderList(tempArray);
}

function renderMovie(film) {
    let listMovies = document.querySelector('.list-movies');
    let html = `
    <div class="movie col s4">
        <img src=${film.urlPoster} alt="poster" data-id=${film.idIMDB}>
        <h5>${film.title}</h5>
        <p>${film.year}</p>
    </div>`;
    listMovies.insertAdjacentHTML('beforeend', html);
}

function onImageClick (e) {
    let filmId = e.target.getAttribute('data-id');
    let hash = `#details|${filmId}`;
    changeHash(hash);
    console.log(hash);
}

function renderList(list) {
    listMovies.innerHTML = '';
    let html = `
    <label>
        <span>from</span>
        <input type="text" class="year-from">
    </label>
    <label>
        <span>to</span>
        <input type="text" class="year-to">
    </label>
    <a class="waves-effect waves-light btn filterByYear">Filter</a>
    <div class="row list-movies"> </div>`
    listMovies.insertAdjacentHTML('beforeend', html);
    list.forEach((film) => {
        renderMovie(film);
    });
    appendEventListeners();
}

function getFilmsInTheaters(){
    listMovies.innerHTML = '';
    let hash = `#in-theaters`;
    changeHash(hash);
}

export function renderInTheaters () {
    let url = `http://api.myapifilms.com/imdb/inTheaters?token=5d0d20e7-5767-403f-b7a0-d070e43c8bba&format=json`;
    request(url, processInTheatersFilms);
}

function appendEventListeners () {
    filterByYearBtn = document.querySelector('.filterByYear');
    filterByYearBtn.addEventListener('click', filterByYear);
    yearFrom = document.querySelector('.year-from');
    yearTo = document.querySelector('.year-to');
    let imageList = document.querySelectorAll('.movie > img');
    for (let i = 0; i < imageList.length; i++) {
        imageList[i].addEventListener('click', onImageClick);
    }
}

function processFilms (res) {
    response = res;
    currentFilmList = response.data.movies;
    console.log(response);    
    renderList(currentFilmList);
}

function processInTheatersFilms (res) {
    response = res;
    currentFilmList = response.data.inTheaters[1].movies;
    console.log('in theaters', response);    
    renderList(currentFilmList);
    let html = `
    <button id="btn-back">Back</button>`
}

function goHome() {
    changeHash('#main');
}

export default mainJs;