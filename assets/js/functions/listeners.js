//Creation d'un objet regroupant nos gestionnaires d'evenements
var APP = {
    //afficher et masquer un element
    toggleNav: (ev)=>{
        document.querySelector('nav').classList.toggle('none') //ce toggle permet d'ajoute une classe au si elle n'existe pas sinon il ne fait rien
    }
}

//la fonction qui va créer nos évènements
var setupListeners = ()=>{
    document.getElementById('bars').onclick = APP.toggleNav
}













