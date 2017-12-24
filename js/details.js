let container = document.querySelector('.container');

function getDetails () {
    let stringifiedFilmDetails = localStorage.getItem('filmDetails');
    let parsedFilmDetails = JSON.parse(stringifiedFilmDetails);
    renderHtml(parsedFilmDetails);
}

function getWriters (film) {
    const {writers} = film;
    const writerNames = writers.map((item) => {
        return item.name;
    })
    return writerNames.join(', ')
}

function renderHtml (film) {
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
    window.location = 'index.html';
}

getDetails();



