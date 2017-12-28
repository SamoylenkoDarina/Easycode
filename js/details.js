import { changeHash } from '../app';
import request from './request'

let container = document.querySelector('.container');
let apiScript;

function renderDetails (id) {
    console.log(id)
    let url = `http://api.myapifilms.com/imdb/idIMDB?idIMDB=${id}&token=5d0d20e7-5767-403f-b7a0-d070e43c8bba&format=json`;
    request(url, processDetails);
}

function getWriters (film) {
    const {writers} = film;
    const writerNames = writers.map((item) => {
        return item.name;
    })
    return writerNames.join(', ')
}

function renderHtml (film) {
    container.innerHTML = '';
    let html = `
        <div class="movie col s4">
            <button id="btn-back" style="display: block; margin: 10px 0;">Back</button>
            <img src=${film.urlPoster} alt="poster" data-id=${film.idIMDB}>
            <h5>${film.title}</h5>
            <p>Year: ${film.year}</p>
            <p>Rating: ${film.rating}</p>
            <p>${film.plot}</p>
            <p>Runtime: ${film.runtime}</p>
            <p>Genres: ${film.genres.join(', ')}</p>
            <p>Country: ${film.countries.join(', ')}</p>
            <p>Writers: ${getWriters(film)}</p>
        </div>`;
    container.insertAdjacentHTML('beforeend', html);
    let btnBack = document.querySelector('#btn-back');
    btnBack.addEventListener('click', goBack)
}

function goBack() {
    changeHash(localStorage.getItem('prevHash'));
}

function processDetails (response) {
    renderHtml(response.data.movies[0]);
}

export default renderDetails;



