
window.onload = () =>{
    //Mise en place des abonnements
    setupListeners()

    //Initialisation de la carte
    initMaps()

    //Récupération des données
    getStations()
    .then( //on écoute les response
        (response)=>{
            console.log(response);
        }
    )
    .catch(
        (error)=>{
            console.log(error);
        }
    )
    

}