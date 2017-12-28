import axios from 'axios';
import mainJs from './js/main';
import renderDetails from './js/details';
import { renderInTheaters } from './js/main';

export function changeHash (hash) {
    window.location.hash = hash;
    loadData()
}

function loadData () {
    let rawHash = window.location.hash;
    let hash = rawHash;
    if (hash.indexOf('|') >= 0) {
        hash = hash.slice(0, hash.indexOf('|'))
    }
    let param = rawHash.slice(rawHash.indexOf('|') + 1);
    console.log("id", param);
    if (hash === '') {
        hash = '#main'
    }
    if (hash === '#main') {
        mainJs();
    } else if (hash === '#details') {
        renderDetails(param);
    } else if (hash === '#in-theaters') {
        renderInTheaters();
        console.log(renderInTheaters);
    }
}

loadData();