
//une fonction asynchrone à cause des données robustes : la reponse ne sera pas instantannée
/**
 * Fonction de recuperations des stationss
 * @returns stations
 */
var getStations = async ()=>{
   var response = await fetch(APP.API_STATION)
   if (!response.ok) {
      throw new Error("Erreur de recuperation des données!")
   }
   //on extrait les stations
   var stations = await response.json() //format de données
   return stations
}