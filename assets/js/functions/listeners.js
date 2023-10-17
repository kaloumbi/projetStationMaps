//Creation d'un objet regroupant nos fonctions gestionnaires d'evenements
var APP = {
    //url api
    API_STATION: "/api/stations.json",
    MYMAP: L.map('map').setView([47.49163, 4.33834], 13), //Utiliser MYMAP partout dans mon application

    //afficher et masquer un element
    toggleNav: (ev) => {
        document.querySelector('nav').classList.toggle('none') //ce toggle permet d'ajoute une classe au si elle n'existe pas sinon il ne fait rien
    }

}



//la fonction qui va créer nos évènements
var setupListeners = () => {
    document.getElementById('bars').onclick = APP.toggleNav
}













