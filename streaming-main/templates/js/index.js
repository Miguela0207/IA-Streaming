$(document).ready(function () {
    $("#buscar").click(function () {
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
    });

    // Función de reconocimiento de voz
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        console.error("El navegador no es compatible con la API de reconocimiento de voz.");
    } else {
        const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        reconocimiento.lang = 'es-ES'; // Establece el idioma del reconocimiento de voz a español

        reconocimiento.onstart = function () {
            console.log("El micrófono está activado");
        }

        reconocimiento.onresult = function (event) {
            const current = event.resultIndex;
            const transcripcion = event.results[current][0].transcript;
            document.getElementById("input").value = transcripcion;
        }

        document.getElementById('voice-search').addEventListener('click', () => {
            reconocimiento.start();
        });

        reconocimiento.onend = function () {
            buscarMensaje();
        };

        function buscarMensaje() {
            const transcripcion = document.getElementById("input").value;
            if (transcripcion.trim() !== '') {
                $("#buscar").click();
            }
        }
    }
});

function sendMessage(event) {
    event.preventDefault();
    $("#buscar").click();
}
