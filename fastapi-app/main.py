from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import logging

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configure templates
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    logger.info('Serving index page')
    return templates.TemplateResponse("index.html", {"request": request})

if __name__ == '__main__':
    logger.info('Starting the application')
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)