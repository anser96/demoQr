$(document).ready(function () {
   
    $('#sendSmsButton').on('click', function () {
        
        getLocation();
    });
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // Enviar la ubicación al servidor
                sendLocationToServer(position.coords.latitude, position.coords.longitude);
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
    $.ajax({
        url: 'https://demoqr-c70967ad0f23.herokuapp.com/sms',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            to: '+573218647995', 
            message: 'Pare que tu paciente Tuvo un accidente Haz click en el enlace para ver la ubicación: ' + mapsLink
        }),
        success: function (response) {
            console.log('SMS enviado exitosamente:', response);
        },
        error: function (error) {
            console.error('Error al enviar el SMS:', error);
        }
    });
}
