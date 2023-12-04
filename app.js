obtenerPhone().then(() => {
    // Esperar 10 segundos y luego obtener la ubicación
    setTimeout(() => {
        getLocation();
    }, 10000);
});
    


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // Enviar la ubicación al servidor
                sendLocationToServer(position.coords.latitude, position.coords.longitude);
                console.log("location")
            },
            function (error) {
                console.error('Error al obtener la ubicación:', error.message);
            }
        );
    } else {
        console.error('La geolocalización no está soportada por este navegador.');
    }
}

function sendLocationToServer(latitude, longitude) {
    // Enviar la ubicación al servidor mediante una solicitud AJAX
    var mapsLink = 'https://www.google.com/maps?q=' + latitude + ',' + longitude;
    let phone = localStorage.getItem('phone')
    let telefono = '+57'+phone;
    $.ajax({
        url: 'https://demoqr-c70967ad0f23.herokuapp.com/sms',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            to: telefono, 
            message: 'Parece que tu paciente tuvo un accidente Haz click en el enlace para ver su ubicación: ' + mapsLink
        }),
        success: function (response) {
            console.log('SMS enviado exitosamente:', response);
        },
        error: function (error) {
            console.error('Error al enviar el SMS:', error);
        }
    });
}

function obtenerPhone(){
    return new Promise((resolve, reject) => {
        let id = obtenerIDDeURL();
        let url = 'https://demoqr-c70967ad0f23.herokuapp.com/paciente/phone/' + id;
        $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            success: function (response) {
                localStorage.setItem('phone', response);
                resolve(); // Resuelve la promesa cuando se obtiene el teléfono
            },
            error: function (error) {
                console.error('Error al recibir el teléfono:', error);
                reject(error); // Rechaza la promesa en caso de error
            }
        });
    });
}
