//Creation d'un objet regroupant nos fonctions gestionnaires d'evenements
var APP = {
    //afficher et masquer un element
    toggleNav: (ev) => {
        document.querySelector('nav').classList.toggle('none') //ce toggle permet d'ajoute une classe au si elle n'existe pas sinon il ne fait rien
    }

}

//fonction d'initialisation de la carte
var initMaps = () => {
    var map = L.map('map').setView([51.505, -0.09], 13);

    //affichage des crédits de la carte
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

//la fonction qui va créer nos évènements
var setupListeners = () => {
    document.getElementById('bars').onclick = APP.toggleNav
}













