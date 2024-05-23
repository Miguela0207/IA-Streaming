import cv2
from fastapi.responses import StreamingResponse
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI, Request


app = FastAPI()

# Configurar la carpeta de plantillas y archivos estáticos
templates = Jinja2Templates(directory="templates")
app.mount("/static", name="static")

@app.get("/video")
async def video_feed():
    cap = cv2.VideoCapture(0)

    def generate():
        while True:
            success, frame = cap.read()
            if not success:
                break
            else:
                ret, buffer = cv2.imencode('.jpg', frame)

                if not ret:
                    continue

                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

    return StreamingResponse(
        generate(),
        media_type="multipart/x-mixed-replace;boundary=frame")

@app.get("/")
def get_html(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

