let spiner = document.querySelector('.spiner');

export default function (url, callback) {
    spiner.classList.remove('hide');
    let apiScript = document.createElement('script');
    apiScript.setAttribute('src', `${url}&callback=processResponse`); 
    window.processResponse = function (response) {
        window.document.body.removeChild(apiScript);
        callback(response);
        spiner.classList.add('hide');
    }
    window.document.body.appendChild(apiScript);
}