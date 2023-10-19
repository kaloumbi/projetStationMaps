//Creation d'un objet regroupant nos fonctions gestionnaires d'evenements
var APP = {
    //url api
    API_STATION: "/api/stations.json",
    MYMAP: L.map('map').setView([47.49163, 4.33834], 13), //Utiliser MYMAP partout dans mon application

    MARKER: [],
    //afficher et masquer un element
    toggleNav: (ev) => {
        document.querySelector('nav').classList.toggle('none') //ce toggle permet d'ajoute une classe au si elle n'existe pas sinon il ne fait rien
    },

    setDatails: (fields) => {
        console.log(fields);
        const { hdebut, hfin } = fields
        let { carburants, services } = fields
        var horaire;
        hdebut === hfin ? horaire = "24h/24" : horaire = hdebut + " à " + hfin
        carburants = carburants ? "<li>" + carburants.split('|').join('</li><li>') + "</li>" : ""

        services = services ? "<li>" + services.split('|').join('</li><li>') + "</li>" : ""

        var template = `
                    <div class="station-cover">
                    <img src="${fields.imageURL} " alt="" width="100%">
                </div>
                <div class="station-title">
                    <h2>${fields.name}</h2>
                </div>
                <div class="station-reviews flex gap-10 p-10">
                    <div class="reviews-note">4.3</div>
                    <div class="reviews-start">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="reviews-resume">
                    ${fields.countNotes} avis
                    </div>
                </div>
                <div class="station-actions flex p-10">
                    <div class="station-action-item flex column flex-1 aic">
                        <i class="fas fa-road"></i>
                        <span>Itinéraires</span>
                    </div>
                    <div class="station-action-item flex column flex-1 aic">
                        <i class="fas fa-road"></i>
                        <span>Enregistrer</span>
                    </div>
                    <div class="station-action-item flex column flex-1 aic">
                        <i class="fas fa-road"></i>
                        <span>Proximité</span>
                    </div>
                    <div class="station-action-item flex column flex-1 aic">
                        <i class="fas fa-road"></i>
                        <span>Phone</span>
                    </div>
                    <div class="station-action-item flex column flex-1 aic">
                        <i class="fas fa-road"></i>
                        <span>Partager</span>
                    </div>
                </div>
                <div class="station-description">
                ${fields.description}
                </div>
                <div class="station-services p-10">
                    <div class="station-service flex aic gap-10">
                        <img src="/assets/icons/adresse.svg" alt="" >
                        <strong>Adresse: </strong>
                        <span class="flex-1">${fields.adresse} <strong> ${fields.codepostal} </strong> ${fields.commune}</span>
                    </div>
                    <div class="station-service flex aic gap-10">
                        <img src="/assets/icons/phone.svg" alt="" >
                        <strong>Téléphone : </strong>
                        <span class="flex-1">+221 771009 55</span>
                    </div>
                    <div class="station-service flex aic gap-10">
                        <img src="/assets/icons/horaire.svg" alt="" >
                        <strong>Horaire: </strong>
                        <span class="flex-1">${horaire}</span>
                    </div>
                    <div class="station-service flex aic gap-10">
                        <img src="/assets/icons/carburant.svg" alt="" >
                        <strong>Carburant : </strong>
                        <ul class="flex-1">
                            ${fields.carburants}
                        </ul>
                    </div>
                    <div class="station-service flex aic gap-10">
                        <img src="/assets/icons/route.svg" alt="" >
                        <strong>Route : </strong>
                        <span class="flex-1">A proximité d'autoroute</span>
                    </div>
                    <div class="station-service flex aic gap-10">
                        <img src="/assets/icons/service.svg" alt="" >
                        <strong>Services : </strong>
                        <ul class="flex-1">
                            ${fields.carburants}
                        </ul>
                    </div>
                    
                </div>
        `
        let nav = document.querySelector('nav')
        nav.classList.contains('none') ? nav.classList.toggle('none') : ""
        nav.innerHTML = template
        nav.scrollTop = 0
        console.log(template);
    }
    ,

    messagePopup: (fields) => {
        //marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

        var div = document.createElement('div')
        var button = document.createElement('button')

        div.className = "station-popup"
        div.innerHTML = `
            <strong> Nom </strong>: ${fields.name} <br>
            <strong> Adresse </strong>:${fields.adresse} <br>
            <strong> Code Postal </strong>: ${fields.codepostal} ${fields.commune} <br>
        `
        button.innerHTML = "En savoir plus"
        button.className = "bt-about-station"

        button.onclick = () => {
            //
            APP.setDatails(fields)
        }

        div.appendChild(button)

        return div
    },

    filterStations: (ev) =>{
        let tag = ev.target.value.trim()
        let stations = JSON.parse(localStorage.getItem("stations")) //Recuperer les données en format Java Script

        //pour cacher l'élément d'autocompletion
        APP.hideSuggestion()

        stations = stations.filter(({fields})=>{
            tag = tag.toLowerCase()
            key_one = fields.name.toLowerCase()
            key_two = fields.adresse.toLowerCase()

            if (key_one.search(tag) >0 || key_two.search(tag) > 0) { //on a trouvé le mot clé à l'interieur
                return true
            }
            return false
        })

        APP.displayAucomplete(stations)
        //console.log(stations);
    },

    displayAucomplete: (stations)=>{
        //console.log(stations);
        let container = document.querySelector('.search-bar-suggestion')
        container.innerHTML = ""
        //Affichage de la boite d'autocompletion
        container.classList.contains('none') ? container.classList.toggle('none'): null
        if (!stations.length) {
            container.innerHTML = `<div class="suggestion-item">Sugestion 1</div> Aucun resultat ne correspond à votre recherche !`
            return; //pour eviter le else
        }

        stations = stations.slice(0, 15)
        stations.forEach(({fields}) =>{
            let div = document.createElement('div')
            div.className = 'suggestion-item'
            div.innerHTML = `
                ${fields.adresse} <strong> ${fields.codepostal} </strong>
                <strong> ${fields.commune} </strong>
            `

            //lorsqu'on clique qu'il nous affiche les détails
            div.onclick = ()=>{
                APP.setDatails(fields)
                APP.hideSuggestion()
                let marker = APP.MARKER.filter(e => e._id === fields._id)[0].marker
                marker.openPopup()
                //console.log(marker);
            }
            container.appendChild(div)
        })
    },

    hideSuggestion: ()=>{
        //pour cacher l'élément d'autocompletion
        let container = document.querySelector('.search-bar-suggestion')
        if (!container.classList.contains('none')) {
            container.classList.add('none')
        }else{

        }
    }


}



//la fonction qui va créer nos évènements
var setupListeners = () => {
    document.getElementById('bars').onclick = APP.toggleNav
    document.querySelector('input').oninput = APP.filterStations
    document.querySelector('input').onmouseover = APP.filterStations
    document.querySelector('.search-bar-suggestion').onmouseleave = APP.hideSuggestion
}













