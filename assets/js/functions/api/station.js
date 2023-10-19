
//une fonction asynchrone à cause des données robustes : la reponse ne sera pas instantannée
/**
 * Fonction de recuperations des stationss
 * @returns stations
 */
var getStations = async ()=>{
   var response = await fetch(APP.API_STATION_FIREBASE)
   if (!response.ok) {
      throw new Error("Erreur de recuperation des données!")
   }
   //on extrait les stations
   var stations = await response.json() //format de données

   //saveData(stations)
   return stations.slice(0, 1000) // bosser sur un nombre limité de données pour éviter le plantage de la machine
}

//fonction pour initialiser les markers
var initMarker = async ()=>{
    var stations = await getStations()

    //filtrer les données ayant des coordonnées gps(fields->latlng)
    stations = stations.filter((station)=>{
        if (station.fields) {
            if (station.fields.latlng) {
                return true
            }
        }
        return false
    })

    //stocker les données en local après recuperation pour les filtres
    localStorage.setItem('stations', JSON.stringify(stations)) //recuperation des données en format textuel

    //var marker = L.marker([51.5, -0.09]).addTo(map);
    stations.forEach(({fields}) => {
        //marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

        let popupMessage =  APP.messagePopup(fields)

        var marker = L.marker(fields.latlng).addTo(APP.MYMAP).bindPopup(popupMessage);
        APP.MARKER.push({
            _id: fields._id,
            marker: marker
        })
        
    });
    //console.log(stations[15].fields.latlng);

    //centrer suivant les coordonnées en premier parametre
    APP.MYMAP.setView(stations[15].fields.latlng, 9) //centrer: ZOOM = 9
    //afficher les stations déjà filtrées
    //return stations

}


//fonction d'initialisation de la carte
var initMaps = () => {

    //affichage des crédits de la carte
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(APP.MYMAP);

    //execution de la fonction initMaker
    initMarker()
    .then(
        ()=>{
            console.log("Initialisation des markers");
        }
    )
    .catch(
        ()=>{
            console.log("Probleme d'initialisation des marqueurs");
        }
    )
}


var saveData = async (data)=>{
    var response = await fetch(APP.API_STATION_FIREBASE, {
        method: 'PUT',
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Erreur de sauvegarde des données!')
    }

    //attendre à ce que la promesse soit tenue
    var result = await response.json()
    return result
}