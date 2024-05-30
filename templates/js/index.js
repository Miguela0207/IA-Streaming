$(document).ready(function () {
    // Función para manejar el clic en el botón "Enviar"
    $("#buscar").click(function () {
        enviarConsulta();
    });

    // Función para manejar el clic en el botón "por Voz"
    $("#buscarPorVoz").click(function () {
        iniciarReconocimientoVoz();
    });

    // Función para enviar la consulta al servidor
    function enviarConsulta() {
        var userInput = $("#input").val().trim();
        $("#input").val("");

        var userMessage = '<div class="chat-message user-message"><div class="message-bubble">' + userInput + '</div></div>';
        $(".chat-content").append(userMessage);

        $(".chat-content").append('<div id="loading-message" class="chat-message ai-message"><div class="message-bubble">Cargando...</div></div>');

        var promptMessage = "Eres un médico, así que solo responderás preguntas sobre medicina. En caso de que la pregunta no esté relacionada con medicina, dirás que eres un doctor y que solo responderás preguntas médicas. Responde SIEMPRE en español O EN EL IDIOMA EN EL QUE TE ESCRIBEN EN CASO TAL DE QUE NO TE ESPECIFIQUEN" + userInput;

        var requestData = {
            "model": "llama2",
            "prompt": promptMessage,
            "stream": false
        };

        $.ajax({
            url: "http://localhost:11434/api/generate",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestData),
            success: function (response) {
                $("#loading-message").remove();

                if (response && response.response) {
                    var responseText = response.response;
                    var aiMessageText = '<div class="chat-message ai-message"><div class="message-bubble">AI (Doctor): ' + responseText + '</div></div>';
                    $(".chat-content").append(aiMessageText);
                } else {
                    console.error("Respuesta inesperada del servidor:", response);
                }
            },
            error: function (xhr, status, error) {
                $("#loading-message").remove();
                console.error("Error de AJAX:", status, error);
            }
        });
    }

    // Función para iniciar el reconocimiento de voz
    function iniciarReconocimientoVoz() {
        // Solicitar permiso para acceder al micrófono del usuario
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                // Crear un nuevo objeto de reconocimiento de voz
                var recognition = new webkitSpeechRecognition();
                recognition.lang = 'es'; // Establecer el idioma del reconocimiento (español en este caso)
                
                // Iniciar el reconocimiento de voz
                recognition.start();
                
                // Cuando se detecta un resultado del reconocimiento
                recognition.onresult = function(event) {
                    // Obtener el texto reconocido
                    var userInput = event.results[0][0].transcript;
                    // Mostrar el texto en el campo de entrada
                    $("#input").val(userInput);
                    // Enviar automáticamente la consulta
                    enviarConsulta();
                };

                // Cuando el reconocimiento de voz finaliza
                recognition.onend = function() {
                    // Detener el flujo de audio
                    stream.getTracks().forEach(track => track.stop());
                };
            })
            .catch(function(error) {
                // Manejar errores, por ejemplo, permisos de micrófono denegados
                console.error('Error al acceder al micrófono:', error);
            });
    }
});
