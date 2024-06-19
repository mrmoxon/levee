from flask import Flask, render_template, request
from datetime import datetime
from dateutil.rrule import rrule, MONTHLY
import calendar
import logging

app = Flask(__name__)
app.debug = True

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/')
def index():
    logger.info('Serving index page')
    current_date = datetime.now()
    start_date = datetime(2015, 5, 1)
    dates = list(rrule(MONTHLY, dtstart=start_date, until=current_date, bymonthday=1))
    dates.reverse()
    return render_template('index.html', datetime=datetime, rrule=rrule, dates=dates, calendar=calendar, MONTHLY=MONTHLY, environ=request.environ)

if __name__ == '__main__':
    logger.info('Starting the application')
    app.run(debug=True)