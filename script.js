//API de IP Geolocations
const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2b64078ef8msh15da1e95bb86437p10b882jsn7ca57ac45e88',
        'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com'
    }
};

// Creamos un método y le pasamos una IP
const fetchIpInfo = ip => {
    //El fetch devuelve una promesa
    //Le pasamos la url como Template String (se usa comilla invertida( alt Gr + } ))
    return fetch(`https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`, OPTIONS)
    .then(res => res.json())  //Transformamos la respuesta en un JSON
    .catch(err => console.error(err))  //Un catch por si tenemos algún error
};

//Llamamos a todas las IDs necesarias
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const submit = document.querySelector('#submit');
const results = document.querySelector('#results');

//Escuchamos el evento submit
form.addEventListener('submit', async(event) => {
    //hacemos un preventDesault ya uqe por defecto al ser un formulario hace una acción POST y se recarga la página 
    event.preventDefault()
    const {value} = input  //Recuperamos el valor de Input

    //Si no tenemos un valor, hacemos un return (ej: 'si no tenemos un valor, no hagas nada')
    if (!value) return 
    submit.setAttribute('disabled', '')  //Desactivamos el botón de SUBMIT (envíar) (así el usuario no le da click de nuevo)
    submit.setAttribute('aria-busy', 'true')  //Atributo de carga de Pico.css

    //Si tenemos un valor, busca la información (Esta es una función asincrona)
    const ipInfo = await fetchIpInfo(value)
    
    //Si tenemos la información de la IP, la convertimos en un String
    if (ipInfo) {
        //Mostramos la información que recuperamos de la API  
        results.innerHTML = JSON.stringify(ipInfo, null, 2)  //Pasamos el objerto que queremos convertir en un String, pasamos null como replacer (Reemplazante) y de espacios ponemos 2 
    }
    
    submit.removeAttribute('disablet')  //Luego del fetch, removemos la desactivación de botón SUBMIT (envíar) 
    submit.removeAttribute('aria-busy')  //Removemos el Atributo de carga de Pico.css
});