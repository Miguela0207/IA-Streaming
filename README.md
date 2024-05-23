# IA Streaming

# Consultorio Médico Virtual con IA

Este proyecto desarrolla un prototipo de consultorio médico virtual que permite la interacción en tiempo real mediante video streaming y chat con un médico impulsado por inteligencia artificial. Utiliza tecnologías como Ollama, FastAPI, HTML, CSS y JavaScript.

## Descripción del Proyecto

El objetivo es crear una aplicación web donde los usuarios puedan interactuar con un médico virtual. La aplicación proporciona:
1. **Streaming de Video**: Visualización en tiempo real a través de la cámara web.
2. **Chat con IA**: Comunicación mediante texto con un médico impulsado por IA.
3. **Reconocimiento de Voz**: Conversión de voz a texto para facilitar la entrada del usuario.

## Tecnologías Utilizadas

- **Frontend**: HTML, CSS, JavaScript, jQuery
- **Backend**: FastAPI
- **IA**: Ollama (utilizando el modelo `llama2`)
- **Video Streaming**: OpenCV
- **Reconocimiento de Voz**: Web Speech API

## Requisitos Previos

1. **Python 3.x**
2. **Node.js y npm** (para instalar dependencias de frontend si es necesario)
3. **Instalación de librerías**:
    ```bash
    pip install fastapi uvicorn opencv-python-headless tensorflow tensorflow-hub jinja2
    ```
4. **Modelo de IA**: Asegúrate de tener el modelo de IA `llama2` configurado y accesible en el endpoint correspondiente.

## Instrucciones de Instalación

1. **Clona el repositorio**:
    ```bash
    git clone [https://github.com/tu-usuario/consultorio-medico-virtual.git](https://github.com/Miguela0207/IA-medica-Streaming.git)
    ```

2. **Configura y ejecuta el servidor backend**:
    ```bash
    uvicorn main:app --reload
    ```

3. **Configura y ejecuta el servidor de IA** (Asegúrate de que el servidor de IA está corriendo en `http://localhost:11434/api/generate`).
